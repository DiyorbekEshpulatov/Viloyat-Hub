// mobile/lib/screens/mentor_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:markdown_widget/markdown_widget.dart';
import '../services/ai_mentor_service.dart';
import '../models/message.dart';

class MentorScreen extends ConsumerStatefulWidget {
  const MentorScreen({super.key});

  @override
  ConsumerState<MentorScreen> createState() => _MentorScreenState();
}

class _MentorScreenState extends ConsumerState<MentorScreen> {
  final TextEditingController _controller = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  List<Message> _messages = [];
  bool _isLoading = false;
  
  final List<String> _suggestedQuestions = [
    'Qanday qilib MChJ ochish mumkin?',
    'Grantlarga qanday ariza topshiraman?',
    'Qaysi soliq tizimi men uchun qulay?',
    'Startapimni qanday rivojlantirishim kerak?',
  ];
  
  @override
  void initState() {
    super.initState();
    _loadChatHistory();
  }
  
  Future<void> _loadChatHistory() async {
    final history = await ref.read(aiMentorProvider).getChatHistory();
    setState(() {
      _messages = history;
    });
  }
  
  Future<void> _sendMessage() async {
    final text = _controller.text.trim();
    if (text.isEmpty) return;
    
    setState(() {
      _messages.add(Message(
        id: DateTime.now().toString(),
        content: text,
        isUser: true,
        timestamp: DateTime.now(),
      ));
      _controller.clear();
      _isLoading = true;
    });
    
    _scrollToBottom();
    
    try {
      final response = await ref.read(aiMentorProvider).sendMessage(text);
      setState(() {
        _messages.add(response);
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _messages.add(Message(
          id: DateTime.now().toString(),
          content: "Kechirasiz, xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.",
          isUser: false,
          timestamp: DateTime.now(),
        ));
        _isLoading = false;
      });
    }
    
    _scrollToBottom();
  }
  
  void _scrollToBottom() {
    Future.delayed(const Duration(milliseconds: 100), () {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 300),
          curve: Curves.easeOut,
        );
      }
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.chat, color: Colors.green),
            SizedBox(width: 8),
            Text('AI Mentor'),
          ],
        ),
        backgroundColor: Colors.white,
        elevation: 0,
      ),
      body: Column(
        children: [
          Expanded(
            child: _messages.isEmpty
                ? _buildEmptyState()
                : ListView.builder(
                    controller: _scrollController,
                    padding: const EdgeInsets.all(16),
                    itemCount: _messages.length,
                    itemBuilder: (context, index) {
                      return _buildMessageBubble(_messages[index]);
                    },
                  ),
          ),
          if (_isLoading) _buildTypingIndicator(),
          _buildInputBar(),
        ],
      ),
    );
  }
  
  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              '🤖',
              style: TextStyle(fontSize: 64),
            ),
            const SizedBox(height: 16),
            const Text(
              'Assalomu alaykum!',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            const Text(
              'Men ViloyatHub AI Mentori. Sizga tadbirkorlik masalalarida yordam beraman.',
              textAlign: TextAlign.center,
              style: TextStyle(color: Colors.grey),
            ),
            const SizedBox(height: 24),
            Wrap(
              spacing: 8,
              runSpacing: 8,
              alignment: WrapAlignment.center,
              children: _suggestedQuestions.map((question) {
                return ActionChip(
                  label: Text(question),
                  onPressed: () {
                    _controller.text = question;
                    _sendMessage();
                  },
                  backgroundColor: Colors.green.shade50,
                  side: BorderSide.none,
                );
              }).toList(),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildMessageBubble(Message message) {
    final isUser = message.isUser;
    
    return Align(
      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        child: Column(
          crossAxisAlignment: isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              decoration: BoxDecoration(
                color: isUser ? Colors.green : Colors.grey.shade200,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(16),
                  topRight: const Radius.circular(16),
                  bottomLeft: isUser ? const Radius.circular(16) : const Radius.circular(4),
                  bottomRight: isUser ? const Radius.circular(4) : const Radius.circular(16),
                ),
              ),
              child: isUser
                  ? Text(
                      message.content,
                      style: const TextStyle(color: Colors.white),
                    )
                  : MarkdownWidget(
                      data: message.content,
                      styleSheet: MarkdownStyleSheet(
                        p: const TextStyle(fontSize: 14),
                        strong: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                    ),
            ),
            const SizedBox(height: 4),
            Text(
              _formatTime(message.timestamp),
              style: const TextStyle(fontSize: 10, color: Colors.grey),
            ),
          ],
        ),
      ),
    );
  }
  
  Widget _buildTypingIndicator() {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey.shade200,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const SizedBox(
              width: 40,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _TypingDot(delay: 0),
                  _TypingDot(delay: 300),
                  _TypingDot(delay: 600),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
  
  Widget _buildInputBar() {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.1),
            blurRadius: 8,
            offset: const Offset(0, -2),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              decoration: InputDecoration(
                hintText: 'Savolingizni yozing...',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: BorderSide.none,
                ),
                filled: true,
                fillColor: Colors.grey.shade100,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              ),
              maxLines: null,
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => _sendMessage(),
            ),
          ),
          const SizedBox(width: 8),
          CircleAvatar(
            backgroundColor: Colors.green,
            child: IconButton(
              icon: const Icon(Icons.send, color: Colors.white, size: 20),
              onPressed: _sendMessage,
            ),
          ),
        ],
      ),
    );
  }
  
  String _formatTime(DateTime time) {
    final now = DateTime.now();
    final diff = now.difference(time);
    
    if (diff.inMinutes < 1) return 'hozir';
    if (diff.inMinutes < 60) return '${diff.inMinutes} min oldin';
    if (diff.inHours < 24) return '${diff.inHours} soat oldin';
    return '${diff.inDays} kun oldin';
  }
}

class _TypingDot extends StatefulWidget {
  final int delay;
  
  const _TypingDot({required this.delay});
  
  @override
  State<_TypingDot> createState() => _TypingDotState();
}

class _TypingDotState extends State<_TypingDot> with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;
  
  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 600),
      vsync: this,
    );
    
    _animation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
    
    Future.delayed(Duration(milliseconds: widget.delay), () {
      _controller.repeat(reverse: true);
    });
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
  
  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: Colors.grey.shade600.withOpacity(_animation.value),
            shape: BoxShape.circle,
          ),
        );
      },
    );
  }
}
