import { useState } from 'react';
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { toast } from 'react-toastify';

import ImageUploader from './image.uploader';
import PlayerService from '../../services/player.service';
import PlayerModel from '../../models/player.model';

const PlayerForm = (props) => {
    const {
        onPlayerAdd,
        onPlayerEdit,
        updatePlayer,
        edit
    } = props;

    const initialState = updatePlayer ? updatePlayer : PlayerModel;

    const [showDialog, setShowDialog] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(edit ? updatePlayer.profileImg : '');

    const onFileChange = (file) => {
        setPreviewUrl(URL.createObjectURL(file));
        formik.setFieldValue(
            "profileImg",
            file
        );
    }

    const onFileDelete = () => {
        setPreviewUrl("");
        formik.values.profileImg = '';
    }

    const formik = useFormik({
        initialValues: {
            firstname: initialState.firstname,
            lastname: initialState.lastname,
            nickname: initialState.nickname,
            profileImg: '',
            id: initialState.id
        },
        validate: (data) => {
            let errors = {};

            if (!data.firstname) {
                errors.firstname = 'Firstname is required';
            }

            if (!data.lastname) {
                errors.lastname = 'Lastname is required';
            }

            if (!data.nickname) {
                errors.nickname = 'Nickname is required';
            }

            return errors;
        },
        onSubmit: async (data) => {
            if (edit) {
                try {
                    if (await PlayerService.updatePlayer(data)) {
                        toast.success('Successfully updated player: ' + data.nickname);
                        onPlayerEdit();
                    }
                } catch (error) {
                    toast.error('Failed to update player: ' + error);
                }
            } else {
                try {
                    if (await PlayerService.createPlayer(data)) {
                        toast.success('Successfully created player: ' + data.nickname);
                        onPlayerAdd();
                    }
                } catch (error) {
                    toast.error('Failed to create new player: ' + error);
                }
            }
            formik.resetForm();
            setPreviewUrl("");
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const cancelForm = () => {
        formik.resetForm();
        setPreviewUrl("");
        setShowDialog(false);
    }


    const footerContent = (
        <div className="d-flex justify-content-end align-items-end gap-3">
            <Button type="button" label="Close" icon="pi pi-times" severity="secondary" onClick={cancelForm} />
            <Button type="submit" label={edit ? 'Update' : 'Create'} icon="pi pi-save" />
        </div>
    );

    return (
        <div>
            <Dialog
                header={edit ? 'Update Player' : 'Add New Player'}
                visible={showDialog}
                blockScroll={true}
                onHide={() => setShowDialog(false)}
                className="m-4"
            >
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <ImageUploader
                                name={formik.values.firstname + ' ' + formik.values.lastname}
                                previewUrl={previewUrl}
                                onFileChange={onFileChange}
                                onFileDelete={onFileDelete}
                            />
                        </div>
                        <div className="col d-flex flex-column justify-content-center align-items-center p-2 pt-4 gap-4">
                            <div className="py-1 w-100 w-sm-50">
                                <span className="p-float-label w-100">
                                    <InputText
                                        id="firstname"
                                        value={formik.values.firstname}
                                        onChange={(e) => {
                                            formik.setFieldValue('firstname', e.target.value);
                                        }}
                                        className={classNames('w-100', { 'p-invalid': isFormFieldInvalid('firstname') })}
                                    />
                                    <label htmlFor="firstname">Firstname</label>
                                </span>
                                {getFormErrorMessage('firstname')}
                            </div>
                            <div className="py-1 w-100 w-sm-50">
                                <span className="p-float-label w-100">
                                    <InputText
                                        id="lastname"
                                        value={formik.values.lastname}
                                        onChange={(e) => {
                                            formik.setFieldValue('lastname', e.target.value);
                                        }}
                                        className={classNames('w-100', { 'p-invalid': isFormFieldInvalid('lastname') })}
                                    />
                                    <label htmlFor="lastname">Lastname</label>
                                </span>
                                {getFormErrorMessage('lastname')}
                            </div>
                            <div className="py-1 w-100 w-sm-50">
                                <span className="p-float-label w-100">
                                    <InputText
                                        id="nickname"
                                        value={formik.values.nickname}
                                        onChange={(e) => {
                                            formik.setFieldValue('nickname', e.target.value);
                                        }}
                                        className={classNames('w-100', { 'p-invalid': isFormFieldInvalid('nickname') })}
                                    />
                                    <label htmlFor="nickname">Nickname</label>
                                </span>
                                {getFormErrorMessage('nickname')}
                            </div>
                        </div>
                        {footerContent}
                    </div>
                </form>
            </Dialog>

            <div className="d-flex justify-content-center">
                <Button
                    severity="primary"
                    icon={edit ? 'pi pi-user-edit' : 'pi pi-user-plus'}
                    onClick={() => setShowDialog(true)}
                />
            </div>
        </div>
    );
};

export default PlayerForm;