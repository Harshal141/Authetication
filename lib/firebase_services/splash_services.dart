import 'package:flutter/material.dart';
//import navigator

import 'dart:async';
import '../ui/auth/login_screen.dart';

class SplashServices {
  void isLogin(BuildContext context) {
    Timer(const Duration(seconds: 3),
        () => Navigator.pushNamed(context, '/login'));
  }
}
