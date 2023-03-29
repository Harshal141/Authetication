import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_auth/firebase_auth.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  FirebaseAuth auth = FirebaseAuth.instance;

  

  @override
  void initState() {
    // auth
    // .authStateChanges()
    // .listen((User? user) {
    //   if (user == null) {
    //     Navigator.pushNamed(context, '/login');
    //   } else {
    //     print('User is signed in!');
        super.initState();
        _controller = AnimationController(vsync: this);
    //   }
    // });
    
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    auth
    .authStateChanges()
    .listen((User? user) {
      if (user == null) {
        Navigator.pushNamed(context, '/login');
      }
    });
    return Scaffold(
      body: Center(
        // sign out button
        child: ElevatedButton(
          onPressed: () {
            auth.signOut();
          },
          child: const Text('Sign Out'),
        ),
      ),
    );
  }
}
