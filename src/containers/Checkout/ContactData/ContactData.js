import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import Input  from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
       orderForm : {
            name: {
                elementType : 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType : 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType : 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType : 'input',
                elementConfig: {
                  type: 'text',
                  placeholder: 'Postal Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType : 'input',
                elementConfig: {
                  type: 'email',
                  placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType : 'select',
                elementConfig: {
                  options :[
                      {
                        value: 'fastest', displayValue: 'Fastest'
                      },
                      {
                        value: 'cheapest', displayValue: 'Cheapest'
                      }
                  ]
                },
                value: '',
                validation: {},
                valid: true
            },
       },
       isFormValid: false,
        loading: false
    }

    checkValidity = (value, rules) => {
       let isValid = true;
       
       if(rules.required) {
         isValid = value.trim() !== '' && isValid;
       }

       if(rules.minLength) {
         isValid = value.length >= rules.minLength && isValid;
      }

      if(rules.maxLength) {
        isValid = value.length <= rules.minLength && isValid;
     }

       return isValid;
    }

    orderHandler = ( event ) => {
        event.preventDefault();

        const formData = {};
        for (const formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        this.setState( { loading: true } );
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );
                this.props.history.push('/');
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
    }

    inputChangeHandler = (event, elementIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
       
        const updatedOrderFormElement = {
            ...updatedOrderForm[elementIdentifier]
        };

        updatedOrderFormElement.value = event.target.value;

        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderForm[elementIdentifier].validation)
        updatedOrderFormElement.touched = true; 
        updatedOrderForm[elementIdentifier] = updatedOrderFormElement;

        let isFormValid = true;
        for(let elementIdentifier in updatedOrderForm){
            isFormValid = isFormValid && updatedOrderForm[elementIdentifier].valid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
        });
    }

    render () {
        let formElemntsArry = [];
        for (const key in this.state.orderForm) {
            formElemntsArry.push({
              id: key,
              config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formElemntsArry.map(formElement => {
                       return  <Input key={formElement.id}  
                                      elementType={formElement.config.elementType} 
                                      elementConfig={formElement.config.elementConfig} 
                                      value={formElement.config.value} 
                                      isValid={!formElement.config.valid}
                                      touched={formElement.config.touched}
                                      shouldValidate={formElement.config.validation}
                                      changed={(event) => this.inputChangeHandler(event, formElement.id)}/>
                    })
                }
                <Button bntType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );
        if ( this.state.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      ings: state.ingredients,
      price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);