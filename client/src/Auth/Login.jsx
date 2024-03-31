import React from 'react'
import {Alert, Button, Card, Spin , Flex, Form, Input, Typography } from 'antd'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
function Login() {
    const {error , loading , loginUser } = useLogin()
    const handleLogin = async (values) => {
        await loginUser(values)
    }
  return (
    <Card className='form-container'>
        {/**form */}
        <Flex gap='large' align='center'>


              {/***image */}
        <Flex flex={1} >
            <img 
            className='auth-image'
            src='https://th.bing.com/th/id/OIP.pUnfpKXb88Qwlq2XfgsCHAHaHa?rs=1&pid=ImgDetMain'/>
        </Flex>


        <Flex vertical flex={1} >
            <Typography.Title level={3} strong className='title'>

                Sign In
            </Typography.Title>

            <Typography.Title type='secondary' strong className='slogan' >
                Unlock you world
            </Typography.Title>


            <Form layout='vertical'
              onFinish={handleLogin} 
              autoComplete='off'
              >
                    


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



                
{error && (<Alert description={error} 
    type='error'
     showIcon closable className='alert' />) 
    
}

<Form.Item>
    <Button
        type={loading ? '' : 'primary'}  
        htmlType='submit'
        size='large'
        className='btn'
    >
        {loading ? <Spin /> : 'Sign In'} 
    </Button>
</Form.Item>



                    
                    <Form.Item>
                        <Link to="/">
                        <Button 
                        size='large'
                        className='btn'
                        >Created Account</Button>
                        </Link>
                       
                    </Form.Item>
            </Form>

        </Flex>

      
        </Flex>
      
    </Card>
  )
}

export default Login