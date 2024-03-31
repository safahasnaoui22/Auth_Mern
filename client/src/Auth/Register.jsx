import React from 'react'
import {Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup'



function Register() {
    const {loading , error , registerUser} = useSignup()
    const handleRegister = (values) => {
        registerUser(values)
    }
  return (
    <Card className='form-container'>
        {/**form */}
        <Flex gap='large' align='center'>
        <Flex vertical flex={1} >
            <Typography.Title level={3} strong className='title'>

                Create an account
            </Typography.Title>

            <Typography.Title type='secondary' strong className='slogan' >
                Join for exclusive access!
            </Typography.Title>


            <Form layout='vertical'
              onFinish={handleRegister} 
              autoComplete='off'
              >
                    <Form.Item label="Full Name"
                    name="name" rules={[{
                        required : true,
                        message : "please input your full name"
                    }]}
                    >
                    <Input size='large' placeholder='Enter your full name' />
                    </Form.Item>


                    <Form.Item label="Email"
                    name="email" rules={[{
                        required : true,
                        message : "please input your  Email"
                    },
                {
                    type: 'email' , 
                    message: 'The input is not valid Email'
                }
                ]}
                    >
                    <Input size='large' placeholder='Enter your  email' />
                    </Form.Item>




                    <Form.Item label="Password"
                    name="password" rules={[{
                        required : true,
                        message : "please input your password"
                    }]}
                    >
                    <Input.Password size='large'  placeholder='Enter your password' />
                    </Form.Item>



                    
                    <Form.Item label="Password"
                    name="passwordConfirm" rules={[{
                        required : true,
                        message : "please input your Confirm password"
                    }]}
                    >
                    <Input.Password size='large'  placeholder='Re-enter your password' />
                    </Form.Item>

{error && (<Alert description={error} 
    type='error'
     showIcon closable className='alert' />) 
    
}

                    <Form.Item>
                        <Button  
                        type={`${loading ? '' : 'primary'}`}
                        htmlType='submit'
                        size='large'
                        className='btn'
                        >
                          {loading ? <Spin/> :  'Create Account ' } 
                            </Button>
                    </Form.Item>


                    
                    <Form.Item>
                        <Link to="/login">
                        <Button 
                        size='large'
                        className='btn'
                        >Sign In</Button>
                        </Link>
                       
                    </Form.Item>
            </Form>

        </Flex>

        {/***image */}
        <Flex flex={1} >
            <img 
            className='auth-image'
            src='https://th.bing.com/th/id/OIP.pUnfpKXb88Qwlq2XfgsCHAHaHa?rs=1&pid=ImgDetMain'/>
        </Flex>
        </Flex>
      
    </Card>
  )
}

export default Register