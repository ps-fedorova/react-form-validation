// Классы
import React, { Component } from 'react';
import Modal from './modal';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = { // так оно открывается
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      valid: {
        firstName: true,
        lastName: true,
        password: true,
        email: true,
      },
      touched: {
        firstName: false,
        lastName: false,
        password: false,
        email: false
      },
      modalisOpen: false
    };

    this.rexExpMap = {
      firstName: /^[a-zA-Zа-яА-ЯёЁ\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      lastName: /^[a-zA-Zа-яА-ЯёЁ\u00c4\u00e4\u00d6\u00f6\u00dc\u00fc\u00df]+$/,
      password: /^.{4,}$/,
      email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    }

    this.handleChange = this.handleChange.bind(this);
    this.checkData = this.checkData.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.checkOnSubmit = this.checkOnSubmit.bind(this);
  }

  handleChange = (e, name) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      this.checkData(this.rexExpMap[name], this.state[name], name)
    });
  }

  // проверка данных
  checkData(regExp, stateName, name) {
    this.setState({
      touched: { ...this.state.touched, [name]: true }
    });

    if (regExp.test(stateName)) {   // если регулярка валидна,то  валидация успешна
      this.setState({
        valid: { ...this.state.valid, [name]: true }
      });
    } else { // если регулярка не валидна,
      this.setState({
        valid: { ...this.state.valid, [name]: false }
      });
    }
  }

  // поле не должно быть пустым
  validate(firstName, lastName, password, email) {
    return {
      firstName: firstName.length === 0,
      lastName: lastName.length === 0,
      password: password.length === 0,
      email: email.length === 0
    };
  }

// переключать стиль в зависимости от успеха валидации
  requiredStyle(name) {
    const show = (this.state[name] === "" || !this.state.valid[name]) && this.state.touched[name];
    return { display: show ? 'block' : 'none' }
  }

// Сообщение валидации
  errorMessages(name) {
    const requiredStr = 'Поле является обязательным';
    const invalidStr = `Поле ${name} содержит некорректные данные.`;
    return !this.state.valid[name] && this.state[name] !== "" ? invalidStr : requiredStr
  }

// Проверка перед отправкой формы
  checkOnSubmit() {
    const { firstName, lastName, password, email } = this.state;

    const formFilled = !(firstName === '' || lastName === '' || password === '' || email === ''); // все поля заполнены
    const formInvalid = Object.keys(this.state.valid).some(x => !this.state.valid[x]); // и валидны

    const formHasErrors = !formFilled || formInvalid;

    if (!formHasErrors) {
      this.toggleModal();
    }
    this.setState({
      touched: {
        firstName: true,
        lastName: true,
        password: true,
        email: true,
      },
    });
  }

  toggleModal() {
    this.setState(x => ({
      modalisOpen: !x.modalisOpen
    }));
  }

  render() {
    const errors = this.validate(this.state.firstName, this.state.lastName, this.state.password, this.state.email);

    // следует отметить ошибку
    const shouldMarkError = (field) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    }

    return (
      <div className="container">
        <div className="register-form">
          <div className="title">Регистрация</div>
          <div className="form">
            <div>
              <label>
                <input
                  placeholder="Имя"
                  type="text"
                  value={this.state.firstName}
                  name="firstName" id="firstName"
                  className={shouldMarkError("firstName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "firstName")}/>
              </label>

              <span
                className="required-field"
                style={this.requiredStyle('firstName')}
              >
                {this.errorMessages('"Имя"')}
              </span>
            </div>

            <div>
              <label>

                <input
                  placeholder="Фамилия"
                  type="text"
                  value={this.state.lastName}
                  name="lastName" id="lastName"
                  className={shouldMarkError("lastName") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "lastName")}/>
              </label>
              <span className="required-field"
                    style={this.requiredStyle('lastName')}>{this.errorMessages('"Фамилия"')}</span>
            </div>

            <div>
              <label>
                <input
                  placeholder="Email"
                  type="text"
                  name="email"
                  value={this.state.email}
                  className={shouldMarkError("email") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "email")}/>
              </label>
              <span className="required-field" style={this.requiredStyle('email')}>{this.errorMessages('"Email"')}</span>
            </div>

            <div>
              <label>
                <input
                  placeholder="Пароль"
                  type="password"
                  value={this.state.password}
                  name="password"
                  className={shouldMarkError("password") ? "error" : ""}
                  onChange={(e) => this.handleChange(e, "password")}/>
              </label>
              <span className="required-field"
                    style={this.requiredStyle('password')}>{this.errorMessages('"Пароль"')}</span>
            </div>

            <button className="sb-btn" type="button" onClick={this.checkOnSubmit}>Отправить</button>
          </div>
        </div>

        {this.state.modalisOpen // если попап открыт
          ? <Modal
            text='Ваши данные'
            {...this.state} // передали их состояние
            closeModal={this.toggleModal} // закрыть попап
          />
          : null
        }

      </div>
    );
  }

}


export default RegistrationForm;

// Хуки
// import React from 'react';
// import Modal from './modal';
// import './RegistrationForm.css';
//
// function RegistrationForm() {
//
//   const [firstName, setFirstName] = React.useState('');
//   const [lastName, setLastName] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [email, setEmail] = React.useState('');
//
//   const [valid, setValid] = React.useState({
//     firstName: true,
//     lastName: true,
//     password: true,
//     email: true,
//   });
//
//   const [touched, setTouched] = React.useState({
//     firstName: false,
//     lastName: false,
//     password: false,
//     email: false
//   });
//
//   const [modalIsOpen, setModalIsOpen] = React.useState(false)
//
//   const rexExpMap = {
//     firstName: /[A-Za-zА-Яа-яЁё]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s\-]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s]*/,
//     lastName: /[A-Za-zА-Яа-яЁё]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s\-]*[A-Za-zА-Яа-яЁё]+[A-Za-zА-Яа-яЁё\s]*/,
//     password: /^.{4,}$/,
//     email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
//   };
//
//
//   // проверить данные
//   function checkData(regExp, stateName, name) {
//     setTouched({
//       touched: { touched, [name]: true }
//     });
//
//     if (regExp.test(stateName)) {
//       setValid({
//         valid: { valid, [name]: true }
//       });
//     } else {
//       setValid({
//         valid: { valid, [name]: false }
//       });
//     }
//   }
//
//
//   // function handleChange (e, name) {
//   //   this.setState
//   //   ({[e.target.name]: e.target.value},
//   //     () => {
//   //     this.checkData(this.rexExpMap[name], this.state[name], this.state.valid[name], name)
//   //   });
//   // }
//
//
//   // this.setState(
//   //
//   //   { [e.target.name]: e.target.value }, // состояние
//   //
//   //
//   //   () => { // проверить
//   //     this.checkData(this.rexExpMap[name], this.state[name], this.state.valid[name], name)
//   //   }
//   //
//   // );
//
//
//
// let inputRef = React.useRef();
//
//   function handleChange(name) {
//     const refValue = inputRef.current.value;
//
//     setFirstName(refValue);
//     setLastName(refValue);
//     setEmail(refValue);
//     setPassword(refValue);
//
//     checkData(rexExpMap[name], [name], name);
//
//   }
//
//   React.useEffect(() => {
//   });
//
// // длина не равна нулю
//   function validate(firstName, lastName, password, email) {
//     return {
//       firstName: firstName.length === 0,
//       lastName: lastName.length === 0,
//       password: password.length === 0,
//       email: email.length === 0
//     };
//   }
//
//   const errors = validate(firstName, lastName, password, email);
//
// // переключать стиль в зависимости от успеха валидации
//   function requiredStyle(name) {
//     const show = ([name] === "" || !valid[name]) && touched[name];
//     return { display: show ? 'block' : 'none' }
//   }
//
// // cообщение валидации
//   function errorMessages(name) {
//     const requiredStr = 'Данное поле является обязательным.';
//     const invalidStr = 'Enter valid ' + name + '.';
//     return !valid[name] && [name] !== "" ? invalidStr : requiredStr
//   }
//
//   toggleModal() {
//     this.setState(x => ({
//       modalisOpen: !x.modalisOpen
//     }));
//   }
//
//
//   function checkOnSubmit() {
//
//     const formFilled = !(firstName === '' || lastName === '' || password === '' || email === '');
//     const formInvalid = Object.keys(valid).some(x => !valid[x]);
//     const formHasErrors = !formFilled || formInvalid;
//
//
//     if (!formHasErrors) {
//       console.log("Кнопка отправить работает");
//       toggleModal();
//     }
//     setTouched({
//       touched: {
//         firstName: true,
//         lastName: true,
//         password: true,
//         email: true,
//       },
//     });
//   }
//
//   // следует отметить ошибку
//   const shouldMarkError = (field) => {
//     const hasError = errors[field];
//     const shouldShow = touched[field];
//     return hasError ? shouldShow : false;
//   }
//
//
//   return (
//     <div className="container">
//       <div className="register-form">
//         <div className="title">Регистрация</div>
//         <div className="form">
//
//
//           <div>
//             <label>
//               <input
//                 ref={inputRef}
//                 placeholder="Имя"
//                 type="text"
//                 // value={firstName}
//                 name="firstName" id="firstName"
//                 className={shouldMarkError("firstName") ? "error" : ""}
//                 onChange={(e) => handleChange("firstName")}/>
//             </label>
//
//             <span className="required-field"
//                   style={requiredStyle('firstName')}
//             >
//               {errorMessages('"Имя"')}
//             </span>
//           </div>
//
//           <div>
//             <label>
//
//               <input
//                 placeholder="Фамилия"
//                 type="text"
//                 ref={inputRef}
//                 // value={lastName}
//                 name="lastName" id="lastName"
//                 className={shouldMarkError("lastName") ? "error" : ""}
//                 onChange={(e) => handleChange("lastName")}/>
//             </label>
//             <span className="required-field"
//                   style={requiredStyle('lastName')}>{errorMessages('"Фамилия"')}</span>
//           </div>
//
//           <div>
//             <label>
//               <input
//                 placeholder="Email"
//                 type="text"
//                 name="email"
//                 // value={email}
//                 ref={inputRef}
//                 className={shouldMarkError("email") ? "error" : ""}
//                 onChange={(e) => handleChange("email")}/>
//             </label>
//             <span className="required-field" style={requiredStyle('email')}>{errorMessages('"Email"')}</span>
//           </div>
//
//           <div>
//             <label>
//               <input
//                 placeholder="Пароль"
//                 type="password"
//                 // value={password}
//                 ref={inputRef}
//                 name="password"
//                 className={shouldMarkError("password") ? "error" : ""}
//                 onChange={(e) => handleChange("password")}
//               />
//             </label>
//             <span className="required-field"
//                   style={requiredStyle('password')}>{errorMessages('"Пароль"')}</span>
//           </div>
//
//           <button className="sb-btn" type="button" onClick={checkOnSubmit}>Отправить</button>
//         </div>
//       </div>
//
//       {modalIsOpen ?
//         <Modal
//           text='Ваши данные'
//           closeModal={toggleModal}
//         />
//         : null
//       }
//     </div>
//   );
//
// }
//
// export default RegistrationForm;
