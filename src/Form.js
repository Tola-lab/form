import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as Yup from "yup";

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <input {...props} {...field}/>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </>
        )
}

const CustomForm = () => {

    return (
        <Formik 
            initialValues = {{
                name: '', 
                email: '', 
                amount: 0, 
                currency: '', 
                text: '',
                terms: false
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                    .min(2, 'Имя должно содержать больше 2 символов')
                    .required('Введите имя!'),
                email: Yup.string()
                    .email('Введите почту в формате "example@gmail.com"')
                    .required('Введите вашу почту!'),
                amount: Yup.number()
                    .min(5, 'Не менее 5')
                    .required('Введите сумму!'),
                currency: Yup.string()
                    .required('Выберите валюту!'),
                terms: Yup.boolean()
                    .required('Необходимо согласие!')
                    .oneOf([true], 'Необходимо согласие!')
            })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}      // values – это объект, в котором хранится всё то, что мы указали в initialValues
            >
            <Form className="form">
                <h2>Отправить пожертвование</h2>
                <MyTextInput 
                    label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"/>
                <MyTextInput 
                    label="Ваша почта"
                    id="email"
                    name="email"
                    type="email"/>
                <MyTextInput 
                    label="Количество"
                    id="amount"
                    name="amount"
                    type="number"/>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as="select">
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className="error" name="currency" component="div"/>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as="textarea"/>
                <label className="checkbox">
                    <Field 
                        name="terms" 
                        type="checkbox" 
                        />
                    Соглашаетесь с политикой конфиденциальности?
                </label>
                <ErrorMessage className="error" name="terms" component="div"/>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    )
}

export default CustomForm;