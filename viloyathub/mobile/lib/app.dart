// mobile/lib/app.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'screens/home_screen.dart';
import 'screens/grants_screen.dart';
import 'screens/mentor_screen.dart';
import 'screens/map_screen.dart';
import 'screens/profile_screen.dart';
import 'widgets/bottom_nav_bar.dart';

class ViloyatHubApp extends ConsumerStatefulWidget {
  const ViloyatHubApp({super.key});

  @override
  ConsumerState<ViloyatHubApp> createState() => _ViloyatHubAppState();
}

class _ViloyatHubAppState extends ConsumerState<ViloyatHubApp> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = const [
    HomeScreen(),
    GrantsScreen(),
    MentorScreen(),
    MapScreen(),
    ProfileScreen(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ViloyatHub',
      theme: ThemeData(
        primarySwatch: Colors.green,
        fontFamily: 'Inter',
        appBarTheme: const AppBarTheme(
          elevation: 0,
          centerTitle: true,
          backgroundColor: Colors.white,
          foregroundColor: Colors.black,
        ),
        bottomNavigationBarTheme: const BottomNavigationBarThemeData(
          selectedItemColor: Colors.green,
          unselectedItemColor: Colors.grey,
          type: BottomNavigationBarType.fixed,
        ),
      ),
      home: Scaffold(
        body: _screens[_currentIndex],
        bottomNavigationBar: BottomNavBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
        ),
      ),
    );
  }
}