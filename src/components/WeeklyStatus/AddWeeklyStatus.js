import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View, Text, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import {Button, Card, Checkbox} from 'react-native-paper';
import Select from '../../helper/Select';
import EnTypo from 'react-native-vector-icons/Entypo';
import {Col, Row} from 'react-native-easy-grid';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
    getAssignedProject,
    getEmployeesData,
    startLoader,
    stopLoader,
    submitWeeklyStatusReport,
} from '../../redux/slices';
import Toast from 'react-native-toast-message';

const FieldRequired = ({show, marginTop, marginBottom}) => {
    if (show) {
        return (<Text style={{color: 'red', marginTop: marginTop, marginBottom: marginBottom}}>
            This field is Required
        </Text>);
    }
};

export const AddWeeklyStatus = (props: any) => {
    const {navigation} = props;
    const dispatch = useAppDispatch();
    const [eventCount, setEventCount] = useState(1);
    const [projectKey, setProjectKey] = useState(1);
    const [toIds, setToIds] = useState([]);
    const [toUser, setToUser] = useState([]);
    const [ccIds, setCcIds] = useState([]);
    const [ccUser, setCcUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [projectOptions, setProjectOptions] = useState([{label: 'Other', value: '0'}]);
    const assignedProjects = useAppSelector((state) => state.project.assignedProjects);
    const employees = useAppSelector((state) => state.employee.employees);
    const newTask = {
        description: '', projectKey: 1,
        errors: {
            projectError: false,
            descriptionError: false,
        },
    };
    const newProject = {...newTask, new_project: true, project_id: ''};
    const [reportDetailAttributes, setReportDetailAttributes] = useState([newProject]);

    useEffect(() => {
        async function fetchData() {
            await dispatch(startLoader());
            await dispatch(getAssignedProject(renderErrorResponseMessage));
            await dispatch(getEmployeesData(renderErrorResponseMessage));
            await dispatch(stopLoader());
        }

        fetchData();
    }, []);


    useEffect(() => {
        let toUsers = [], ccUsers = [], superAdmins = [];
        if (employees && employees.length > 0) {
            superAdmins = employees.filter(({role}) => ['super_admin'].includes(role));
            toUsers = employees.filter(({role}) => ['manager', 'super_admin'].includes(role));
            ccUsers = employees.filter(({role}) => ['employee', 'hr'].includes(role));
        }
        if (superAdmins && superAdmins.length > 0) {
            superAdmins.map((user) => checkUnCheckToIds(user.id, true));
        }
        setToUser(toUsers);
        setCcUser(ccUsers);
    }, [employees]);

    useEffect(() => {
        let projectOptions = [];
        if (assignedProjects && assignedProjects.length > 0) {
            projectOptions = assignedProjects.map(({name, id, manager_id}) => ({
                label: name,
                value: id,
                manager_id: manager_id,
            }));
        }
        projectOptions.push({label: 'Other', value: 0});
        setProjectOptions(projectOptions);
    }, [assignedProjects]);

    const renderResponseMessage = (success, response) => {
        if (success) {
            Toast.show({
                type: 'success',
                isVisible: true,
                text1: response.message,
                visibilityTime: 4000,
                position: 'top',
            });
        } else {
            Toast.show({
                type: 'error',
                isVisible: true,
                text1: response.message,
                visibilityTime: 4000,
                position: 'top',
            });
        }
    };

    const renderErrorResponseMessage = (success, response) => {
        if (!success) {
            Toast.show({
                type: 'error',
                isVisible: true,
                text1: response.message,
                visibilityTime: 4000,
                position: 'top',
            });
        }
    };

    const checkUnCheckToIds = (id, addOnly = false) => {
        if (addOnly) {
            if (!(toIds.includes(id))) {
                setToIds([...toIds, id]);
            }
        } else {
            if (toIds.includes(id)) {
                setToIds(toIds.filter((data) => data !== id));
            } else {
                setToIds([...toIds, id]);
            }
        }
    };

    const checkUnCheckCcIds = (id) => {
        if (ccIds.includes(id)) {
            setCcIds(ccIds.filter((data) => data !== id));
        } else {
            setCcIds([...ccIds, id]);
        }
    };

    const sendDSR = async () => {
        setLoading(true);
        if (!validate()) {
            let formData = new FormData();
            await reportDetailAttributes.map(({project_id, description}, index) => {
                formData.append(`weekly_status_reports_attributes[${index}][description]`, description);
                formData.append(`weekly_status_reports_attributes[${index}][project_id]`, project_id);
            });

            toIds && toIds.map((id) => formData.append('to_ids[]', id));
            ccIds && ccIds.map((id) => formData.append('cc_ids[]', id));
            await dispatch(submitWeeklyStatusReport(formData, (success, response) => {
                if (success) {
                    navigation.navigate('WeeklyStatusDetail', {id: response.data.id, type: 'send'});
                }
                renderResponseMessage(success, response);
            }));
        }
        setLoading(false);
    };


    const validate = () => {
        let reportDetailAttributeData = reportDetailAttributes;
        let error = false;
        reportDetailAttributeData.map((data) => {
            if (data.project_id === '') {
                data.errors = {...data.errors, projectError: true};
                error = true;
            }
            if (data.description.trim() === '') {
                data.errors = {...data.errors, descriptionError: true};
                error = true;
            }
        });
        setReportDetailAttributes(reportDetailAttributeData);
        setProjectKey(projectKey + 1);
        return error;
    };

    const addNewProject = () => {
        let reportDetailAttributeData = reportDetailAttributes;
        reportDetailAttributeData.push({...newProject, projectKey: projectKey + 1});
        setReportDetailAttributes(reportDetailAttributeData);
        setProjectKey(projectKey + 1);
    };

    const removeProject = (index, projectKey) => {
        let reportDetailAttributeData = reportDetailAttributes.filter((project) => project.projectKey !== projectKey);
        setReportDetailAttributes(reportDetailAttributeData);
        setEventCount(eventCount + 1);
    };

    const clearErrorMessage = (key, index) => {
        let data = fetchRecordByIndex(index);
        let newReportDetailAttributes = reportDetailAttributes;
        let errors = {...data.errors, [key]: false};
        newReportDetailAttributes[index] = {...data, errors: errors};
        setReportDetailAttributes(newReportDetailAttributes);
        setEventCount(eventCount + 1);
    };

    const setProject = (projectValue, index) => {
        let data = fetchRecordByIndex(index);
        const {value, manager_id} = projectValue;
        if (manager_id) {
            checkUnCheckToIds(manager_id, true);
        }
        let newReportDetailAttributes = reportDetailAttributes;
        newReportDetailAttributes[index] = {...data, project_id: value};
        setReportDetailAttributes(newReportDetailAttributes);
        clearErrorMessage('projectError', index);
        setEventCount(eventCount + 1);
    };

    const setDescription = (description: string, index: number) => {
        let data = fetchRecordByIndex(index);
        let newReportDetailAttributes = reportDetailAttributes;
        if (description === ' ') {
            description = '';
        }
        newReportDetailAttributes[index] = {...data, description: description};
        setReportDetailAttributes(newReportDetailAttributes);
        clearErrorMessage('descriptionError', index);
        setEventCount(eventCount + 1);
    };

    const fetchRecordByIndex = (index) => {
        return reportDetailAttributes[index];
    };

    return (
        <View style={styles.mainView}>
            <ScrollView bounces={false}>
                <View style={styles.containerView}>
                    <Text style={styles.statusText}>
                        New Weekly Report
                    </Text>
                </View>
                <Card style={styles.cardStyle}>
                    {
                        reportDetailAttributes && reportDetailAttributes.map((data, index) => {
                            const {
                                projectKey, project_id, description,
                                errors: {projectError, descriptionError},
                            } = data;
                            return (
                                <View style={styles.newStatusReport} key={index}>
                                    <>
                                        <Select value={project_id}
                                                disabled={loading}
                                                items={projectOptions}
                                                style={[{
                                                    width: '85%',
                                                    minHeight: 40,
                                                }, projectError ? styles.error : {}]}
                                                dropDownContainerStyle={{width: '85%'}}
                                                placeholder={'Select Project'}
                                                placeholderStyle={styles.selectPlaceholderStyle}
                                                onSelectItem={(itemData) => setProject(itemData, index)}/>
                                        <>
                                            {
                                                index === 0 ?
                                                    <TouchableOpacity activeOpacity={1}
                                                                      style={styles.newProjectButtonStyleOpacity}
                                                                      onPress={() => addNewProject()}>
                                                        <EnTypo size={30}
                                                                disabled={loading}
                                                                style={styles.newProjectButtonStyle}
                                                                name="squared-plus"
                                                                color={'#05b1c5'}/>
                                                    </TouchableOpacity>
                                                    :
                                                    <TouchableOpacity activeOpacity={1}
                                                                      style={styles.newProjectButtonStyleOpacity}
                                                                      onPress={() => confirm('Project', () => removeProject(index, projectKey))}>
                                                        <EnTypo size={30}
                                                                disabled={loading}
                                                                style={styles.newProjectButtonStyle}
                                                                name="squared-cross"
                                                                color={'#f5365c'}/>
                                                    </TouchableOpacity>

                                            }
                                        </>
                                        <FieldRequired show={projectError} marginTop={5}/>
                                        <View style={styles.projectBorderBottom}/>
                                    </>
                                    <Row>
                                        <TextInput multiline={true}
                                                   placeholder={'Description...'}
                                                   placeholderTextColor={'#A9A9A9'}
                                                   editable={!loading}
                                                   value={description}
                                                   autoCorrect={false}
                                                   selectTextOnFocus={false}
                                                   onChangeText={(value) => setDescription(value, index)}
                                                   style={[styles.taskDescriptionStyle, descriptionError ? styles.error : {}]}/>
                                    </Row>
                                    <Row style={styles.borderRowBottom}>
                                        <FieldRequired show={descriptionError}/>
                                    </Row>
                                </View>
                            );
                        })
                    }
                    <View style={styles.sendToView}>
                        <Row style={styles.borderRowBottom}>
                            <Col size={1} style={{minWidth: 40}}>
                                <Text style={styles.sendTo}>Send To : </Text>
                            </Col>
                            <Col size={9}>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        toUser && toUser.map((user, index) =>
                                            <TouchableOpacity activeOpacity={1}
                                                              onPress={() => checkUnCheckToIds(user.id)}>
                                                <Checkbox.Item label={user.full_name}
                                                               key={index}
                                                               style={styles.checkBoxStyle}
                                                               labelStyle={styles.checkBoxLabelStyle}
                                                               mode={'android'}
                                                               disabled={user.role === 'super_admin'}
                                                               color={'#172b4d'}
                                                               position={'leading'}
                                                               status={(user.role === 'super_admin' || toIds.includes(user.id)) ? 'checked' : 'unchecked'}/>
                                            </TouchableOpacity>,
                                        )
                                    }
                                </View>
                            </Col>
                        </Row>
                    </View>
                    <View style={styles.sendCCView}>
                        <Row style={styles.borderRowBottom}>
                            <Col size={1} style={{minWidth: 40}}>
                                <Text style={styles.sendTo}>Send Cc : </Text>
                            </Col>
                            <Col size={9}>
                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                    {
                                        ccUser && ccUser.map((user, index) =>
                                            <TouchableOpacity activeOpacity={1} key={index}
                                                              onPress={() => checkUnCheckCcIds(user.id)}>
                                                <Checkbox.Item label={user.full_name}
                                                               style={styles.checkBoxStyle}
                                                               labelStyle={styles.checkBoxLabelStyle}
                                                               mode={'android'}
                                                               color={'#172b4d'}
                                                               position={'leading'}
                                                               status={ccIds.includes(user.id) ? 'checked' : 'unchecked'}/>
                                            </TouchableOpacity>,
                                        )
                                    }
                                </View>
                            </Col>
                        </Row>
                    </View>
                    <View style={styles.submitButtonStyle}>
                        <TouchableOpacity activeOpacity={1}
                                          style={styles.submitButton}>
                            <Button icon={loading ? 'loading' : ''}
                                    loading={loading}
                                    color={'#05b1c5'}
                                    onPress={sendDSR}
                                    disabled={loading}
                                    labelStyle={{fontSize: 16}}
                                    mode="contained">
                                Submit
                            </Button>
                        </TouchableOpacity>
                    </View>
                </Card>
            </ScrollView>
        </View>
    );
};


function confirm(title = 'task', onConfirm) {
    Alert.alert(
        'Delete',
        `Are you sure you want to delete this ${title}?`,
        [
            {
                text: 'Yes',
                onPress: onConfirm,
            },
            {
                text: 'No',
            },
        ],
        {cancelable: false},
    );
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    newProjectButtonStyleOpacity: {
        position: 'absolute',
        zIndex: 9999,
        width: '15%',
        right: 0,
        height: 50,
        marginTop: 15,
    },
    newProjectButtonStyle: {
        height: 50,
    },
    containerView: {
        padding: 10,
        backgroundColor: '#172b4d',
        paddingBottom: 80,
    },
    newStatusReport: {
        padding: 10,
        minHeight: 100,
    },
    cardStyle: {
        margin: 15,
        borderRadius: 5,
        marginTop: -55,
        paddingBottom: 10,
    },
    taskStyle: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        minHeight: 40,
        alignItems: 'center',
        marginTop: 10,
    },
    taskDescriptionStyle: {
        padding: 10,
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        minHeight: 100,
        marginTop: 10,
        marginBottom: 10,
        maxHeight: 150,
        textAlignVertical: 'top',
        color: '#111111',
    },
    statusText: {
        color: '#FFF',
        margin: 5,
        fontSize: 20,
        marginBottom: 10,
    },
    justifyContentCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    projectBorderBottom: {
        paddingBottom: 5,
        borderBottomWidth: 0.2,
    },
    borderRowBottom: {
        paddingBottom: 5,
        borderBottomWidth: 0.2,
    },
    selectTimeStyle: {
        textJustify: 'center',
        fontWeight: '700',
        maxWidth: 60,
    },
    submitButton: {
        minHeight: 40,
        flex: 1,
        margin: 10,
        marginTop: 10,
        marginBottom: 0,
        justifyContent: 'center',
    },
    submitButtonStyle: {
        flexDirection: 'row',
    },
    alignCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        borderColor: 'red',
    },
    sendToView: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    sendCCView: {
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
    },
    sendTo: {
        paddingTop: 5,
        fontSize: 16,
        fontWeight: '700',
        color: '#172b4d',
    },
    checkBoxStyle: {
        backgroundColor: '#ffffff',
        opacity: 1,
        minWidth: 10,
        paddingLeft: 0,
        paddingRight: 5,
        paddingTop: 0,
        paddingBottom: 0,
    },
    checkBoxLabelStyle: {
        backgroundColor: '#ffffff',
        marginLeft: -5,
        fontSize: 12,
    },
    selectPlaceholderStyle: {
        color: '#A9A9A9',
    },
});
