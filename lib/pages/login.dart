import 'package:flutter/material.dart';

class Login extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Material(
      child: Column(
        children: [
          Image.asset("assets/images/login.png",
          fit: BoxFit.cover,
          ),
          Text("LOgin")
        ],
      )
    );
  }
}