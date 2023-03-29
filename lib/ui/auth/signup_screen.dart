import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_application_1/widgets/round_button.dart';
import 'package:flutter_application_1/widgets/utils.dart';
import 'dart:async';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool isLoading = false;

  FirebaseAuth auth = FirebaseAuth.instance;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
    emailController.dispose();
    passwordController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    auth
    .authStateChanges()
    .listen((User? user) {
      if (user == null) {
      } else {
        Navigator.pushNamed(context, '/');
      }
    });
    return Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          title: const Text('Signup'),
        ),
        body: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Form(
                    key: _formKey,
                    child: Column(
                      children: [
                        TextFormField(
                          keyboardType: TextInputType.emailAddress,
                          controller: emailController,
                          decoration: const InputDecoration(
                            hintText: 'email',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'Please enter email';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 20),
                        TextFormField(
                          keyboardType: TextInputType.visiblePassword,
                          controller: passwordController,
                          obscureText: true,
                          decoration: const InputDecoration(
                            hintText: 'Password',
                            border: OutlineInputBorder(),
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return 'Please enter Password';
                            }
                            return null;
                          },
                        ),
                        const SizedBox(height: 20),
                      ],
                    )),
                RoundButton(
                  title: 'SignUp',
                  isLoading: isLoading,
                  onTap: () async {
                    if (_formKey.currentState!.validate()) {
                      // setState(() {
                      //   isLoading = true;
                      // });
                      //   auth
                      //       .createUserWithEmailAndPassword(
                      //           email: emailController.text,
                      //           password: passwordController.text.toString())
                      //       .then((value) {
                      //         setState(() {
                      //           isLoading = false;
                      //         });
                      //         })
                      //       .onError((error, stack) {
                      //         Utils().toastMessage(error.toString());
                      //         setState(() {
                      //           isLoading = false;
                      //         });
                      //       });
                      try {
                        setState(() {
                          isLoading = true;
                        });
                        UserCredential userCredential = await FirebaseAuth
                            .instance
                            .createUserWithEmailAndPassword(
                                email: emailController.text,
                                password: passwordController.text.toString())
                            .then((value) {
                                Navigator.pushNamed(context, '/');
                                return value;
                        });
                      } on FirebaseAuthException catch (e) {
                        setState(() {
                          isLoading = false;
                        });
                        if (e.code == 'weak-password') {
                          Utils().toastMessage(
                              'The password provided is too weak.');
                        } else if (e.code == 'email-already-in-use') {
                          Utils().toastMessage(
                              'The account already exists for that email.');
                        }
                      } catch (e) {
                        setState(() {
                          isLoading = false;
                        });
                        print(e);
                      }
                    }
                  },
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    const Text('Already Have an account?'),
                    TextButton(
                      onPressed: () {
                        Navigator.pushNamed(context, '/login');
                      },
                      child: const Text('Log In'),
                    )
                  ],
                )
              ],
            )));
  }
}
