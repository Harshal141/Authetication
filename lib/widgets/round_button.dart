import 'package:flutter/material.dart';

class RoundButton extends StatelessWidget {
  final String title;
  final VoidCallback? onTap;
  final isLoading;
  const RoundButton(
      {super.key,
      required this.title,
      required this.onTap,
      this.isLoading = false});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
          height: 50,
          decoration: BoxDecoration(
            color: Colors.deepPurple,
            borderRadius: BorderRadius.circular(30),
          ),
          child: Center(
              child:
                  isLoading ? const CircularProgressIndicator() : Text(title))),
    );
  }
}
