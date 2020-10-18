import React from 'react';
import { Field, Form, Formik } from 'formik';
import classes from './Users.module.css'
import { FilterType } from '../../../redux/usersReducer';

const usersSearchValidate = (values: any): any => {
    const errors = {};/* 
    if (!values.term) {
        errors.term = 'Required'
    } */
    return errors;
}

type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

type UsersSearchFormType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: React.FC<UsersSearchFormType> = ({ onFilterChanged }) => {
    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        let search_values: FilterType = {
            term: values.term,
            friend: values.friend === 'null'
                ? null
                : values.friend === "true"
                    ? true
                    : false,
        }
        onFilterChanged(search_values)
        setSubmitting(false);
    };
    return (
        <div className={classes.search_form_wrapper}>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validate={usersSearchValidate}
                onSubmit={submit}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field className={classes.serach_form_input} type='text' name='term' />
                        <Field className={classes.search_filter} name='friend' as="select">
                            <option value="null">All</option>
                            <option value="true">Friends</option>
                            <option value="false">Not friends</option>
                        </Field>
                        <button className={classes.serach_form_btn} type="submit" disabled={isSubmitting}>Find</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};