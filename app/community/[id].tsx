import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Bookmark, Heart, MessageCircle, Share2, Sparkles, ThumbsUp } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

type Article = {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  published: string;
  category: string;
  heroImage: string;
  gallery: string[];
  body: string[];
  likes: string;
  commentsCount: string;
};

const ARTICLE_DATA: Record<string, Article> = {
  h1: {
    id: 'h1',
    title: 'How to Layer Serums Correctly',
    subtitle: 'Simple order for better absorption and less irritation.',
    author: 'Skinova Editorial',
    readTime: '6 min read',
    published: 'Today',
    category: 'Editor Pick',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'Layering serums the right way protects your skin barrier and helps active ingredients perform better. A simple flow is lightweight hydration first, treatment second, then barrier support.',
      'Apply each layer on slightly damp skin and give 30-60 seconds before adding the next product. This reduces pilling and helps the skin absorb evenly.',
      'If your skin feels irritated, simplify your stack. Focus on hydration, niacinamide, and sunscreen for a week before reintroducing stronger actives.',
    ],
    likes: '2.4k',
    commentsCount: '186',
  },
  h2: {
    id: 'h2',
    title: 'SPF Myths You Should Stop Believing',
    subtitle: 'Daily sunscreen truths from dermatology guidance.',
    author: 'Derm Community Team',
    readTime: '5 min read',
    published: 'Yesterday',
    category: 'Trending',
    heroImage: 'https://images.unsplash.com/photo-1526758097130-bab247274f58?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'Sunscreen is not only for sunny days. UV exposure still happens through clouds and windows, especially UVA which contributes to aging and pigmentation.',
      'Use enough product: about two finger lengths for face and neck. Reapply every two hours outdoors or after sweat and water exposure.',
      'The best SPF is the one you can wear daily with comfort. Texture, finish, and consistency matter more than chasing the highest number.',
    ],
    likes: '3.1k',
    commentsCount: '244',
  },
  n1: {
    id: 'n1',
    title: 'Morning vs Night Routine: What Changes?',
    subtitle: 'Understand when to use active ingredients and when to keep your routine calm.',
    author: 'Skinova Community',
    readTime: '4 min read',
    published: '2 days ago',
    category: 'Routine',
    heroImage: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'Morning routines prioritize protection: antioxidants, moisturizer, and sunscreen. Night routines focus on recovery, repair, and treatment.',
      'Keep your morning stack simple and non-irritating so makeup and SPF layer well. Save exfoliants or retinoids for evening use.',
      'Consistency beats complexity. A simple routine done daily can outperform an advanced routine done inconsistently.',
    ],
    likes: '1.8k',
    commentsCount: '109',
  },
  n2: {
    id: 'n2',
    title: 'What to Do When Skin Suddenly Feels Dry',
    subtitle: 'A quick recovery plan to hydrate, protect, and avoid over-exfoliation.',
    author: 'Barrier Academy',
    readTime: '3 min read',
    published: '3 days ago',
    category: 'Hydration',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
      'https://i.pinimg.com/1200x/fb/38/a7/fb38a7ce68e8db64387f56c9362c9cd1.jpg',
    ],
    body: [
      'When dryness spikes, pause harsh actives for a few days. Rebuild with ceramides, glycerin, and gentle cleansers.',
      'Avoid hot water and over-cleansing. Seal hydration with a richer moisturizer, especially at night.',
      'If irritation persists, simplify to cleanser, moisturizer, and SPF while the barrier recovers.',
    ],
    likes: '1.4k',
    commentsCount: '96',
  },
  n3: {
    id: 'n3',
    title: 'Skinova Community Roundup This Week',
    subtitle: 'Top member discussions, product wins, and practical routines worth trying.',
    author: 'Community Manager',
    readTime: '5 min read',
    published: 'This week',
    category: 'Community',
    heroImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'This week members shared fast routines for busy schedules, before-and-after hydration progress, and sunscreen recommendations for humid climates.',
      'Top discussion: combining niacinamide and vitamin C without irritation by using alternating routines.',
      'Community-tested routines help turn advice into habits, especially when supported by reminders and simple tracking.',
    ],
    likes: '2.7k',
    commentsCount: '221',
  },
  m1: {
    id: 'm1',
    title: 'Best Ingredients for Beginners',
    subtitle: 'Start with gentle actives and build confidence.',
    author: 'Skinova Lab',
    readTime: '4 min read',
    published: '4 days ago',
    category: 'Beginners',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://i.pinimg.com/1200x/fb/38/a7/fb38a7ce68e8db64387f56c9362c9cd1.jpg',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'Good beginner ingredients include niacinamide, hyaluronic acid, and ceramides. They are generally well tolerated and support skin health.',
      'Introduce one new product at a time and patch test before full use.',
      'A steady routine with gentle products is the fastest way to long-term results.',
    ],
    likes: '1.2k',
    commentsCount: '74',
  },
  m2: {
    id: 'm2',
    title: 'How Community Builds Better Skin Habits',
    subtitle: 'Shared routines, reminders, and support improve consistency.',
    author: 'Skinova Social',
    readTime: '4 min read',
    published: '5 days ago',
    category: 'Community',
    heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'Healthy skin habits are easier when you learn with others. Community accountability increases routine adherence and helps troubleshoot faster.',
      'Members often discover practical fixes from real experiences, not just textbook routines.',
      'Small wins shared publicly can become long-term consistency.',
    ],
    likes: '1.9k',
    commentsCount: '133',
  },
  m3: {
    id: 'm3',
    title: '5-Minute Night Routine Guide',
    subtitle: 'A fast reset flow for busy evenings.',
    author: 'Skinova Experts',
    readTime: '3 min read',
    published: '6 days ago',
    category: 'Night Care',
    heroImage: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1400&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80',
    ],
    body: [
      'If you have only five minutes: cleanse, hydrate, moisturize. That is enough for many skin types on high-stress days.',
      'Add one treatment step only if your skin feels stable and not reactive.',
      'The best routine is the one you can repeat every day.',
    ],
    likes: '1.6k',
    commentsCount: '88',
  },
};

const RELATED = [
  { id: 'h2', title: 'SPF Myths You Should Stop Believing', image: 'https://i.pinimg.com/1200x/fb/38/a7/fb38a7ce68e8db64387f56c9362c9cd1.jpg' },
  { id: 'n2', title: 'What to Do When Skin Suddenly Feels Dry', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80' },
  { id: 'm2', title: 'How Community Builds Better Skin Habits', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80' },
];

const COMMENTS = [
  { id: 'c1', name: 'Amina K.', avatar: 'https://i.pravatar.cc/120?img=47', text: 'I changed my layering order and my skin feels calmer already.', likes: 46 },
  { id: 'c2', name: 'Ruth N.', avatar: 'https://i.pravatar.cc/120?img=31', text: 'Please add a save button for routines from these articles!', likes: 33 },
  { id: 'c3', name: 'Skinova Mod', avatar: 'https://i.pravatar.cc/120?img=12', text: 'Great feedback. We are shipping this in the next update.', likes: 57 },
];

export default function CommunityArticleDetailsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [liked, setLiked] = useState(false);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [commentText, setCommentText] = useState('');

  const article = useMemo(() => ARTICLE_DATA[id ?? 'h1'] ?? ARTICLE_DATA.h1, [id]);

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 36 }}>
        <View style={styles.heroWrap}>
          <Image source={{ uri: article.heroImage }} style={styles.heroImage} contentFit="cover" />
          <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.55)']} style={StyleSheet.absoluteFillObject} />
          <View style={[styles.heroHeader, { paddingTop: insets.top + 8 }]}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()} activeOpacity={0.9}>
              <ArrowLeft size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.heroHeaderRight}>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9}>
                <Bookmark size={18} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconBtn} activeOpacity={0.9}>
                <Share2 size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.heroTextWrap}>
            <View style={styles.categoryPill}>
              <Sparkles size={12} color="#065F46" />
              <Text style={styles.categoryPillText}>{article.category}</Text>
            </View>
            <Text style={styles.heroTitle}>{article.title}</Text>
            <Text style={styles.heroSubtitle}>{article.subtitle}</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{article.author}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>{article.readTime}</Text>
          <View style={styles.metaDot} />
          <Text style={styles.metaText}>{article.published}</Text>
        </View>

        <View style={styles.engagementRow}>
          <View style={styles.statPill}>
            <Heart size={14} color="#059669" />
            <Text style={styles.statText}>{article.likes}</Text>
          </View>
          <View style={styles.statPill}>
            <MessageCircle size={14} color="#059669" />
            <Text style={styles.statText}>{article.commentsCount} comments</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, liked && styles.actionButtonActive]}
            activeOpacity={0.9}
            onPress={() => setLiked((prev) => !prev)}
          >
            <Heart size={16} color={liked ? '#FFFFFF' : '#059669'} />
            <Text style={[styles.actionButtonText, liked && styles.actionButtonTextActive]}>
              {liked ? 'Loved' : 'Love'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.9}
            onPress={() => setIsCommentModalVisible(true)}
          >
            <MessageCircle size={16} color="#059669" />
            <Text style={styles.actionButtonText}>Add Comment</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.articleBodyWrap}>
          {article.body.map((paragraph, idx) => (
            <Text key={idx} style={styles.paragraph}>
              {paragraph}
            </Text>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Image Highlights</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryScroll}>
          {article.gallery.map((img, idx) => (
            <Image key={`${img}-${idx}`} source={{ uri: img }} style={styles.galleryImage} contentFit="cover" />
          ))}
        </ScrollView>

        <View style={styles.sponsoredCard}>
          <LinearGradient colors={['#ECFDF5', '#FFFFFF']} style={StyleSheet.absoluteFillObject} />
          <Text style={styles.sponsoredLabel}>Sponsored</Text>
          <Text style={styles.sponsoredTitle}>Skinova Pro Set - Barrier + Glow Bundle</Text>
          <Text style={styles.sponsoredDesc}>Community favorite for hydration, tone balance, and everyday skin comfort.</Text>
          <TouchableOpacity style={styles.sponsoredBtn} activeOpacity={0.9}>
            <Text style={styles.sponsoredBtnText}>View Offer</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Related Articles</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedScroll}>
          {RELATED.filter((item) => item.id !== article.id).map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.relatedCard}
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/community/[id]', params: { id: item.id } })}
            >
              <Image source={{ uri: item.image }} style={styles.relatedImage} contentFit="cover" />
              <Text style={styles.relatedTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Comments</Text>
        </View>
        <View style={styles.commentsWrap}>
          {COMMENTS.map((comment) => (
            <View key={comment.id} style={styles.commentCard}>
              <View style={styles.commentTopRow}>
                <View style={styles.commentUserRow}>
                  <Image source={{ uri: comment.avatar }} style={styles.commentAvatar} contentFit="cover" />
                  <Text style={styles.commentName}>{comment.name}</Text>
                </View>
                <View style={styles.commentLikeRow}>
                  <ThumbsUp size={12} color="#059669" />
                  <Text style={styles.commentLikeText}>{comment.likes}</Text>
                </View>
              </View>
              <Text style={styles.commentText}>{comment.text}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.addCommentBtn}
            activeOpacity={0.9}
            onPress={() => setIsCommentModalVisible(true)}
          >
            <Text style={styles.addCommentText}>Add Comment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal
        visible={isCommentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCommentModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 12 : 0}
        >
          <View style={styles.commentModalCard}>
            <Text style={styles.commentModalTitle}>Write a Comment</Text>
            <Text style={styles.commentModalSub}>Share your thoughts with the Skinova community.</Text>
            <TextInput
              style={styles.commentInput}
              placeholder="Type your comment..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={commentText}
              onChangeText={setCommentText}
            />
            <View style={styles.commentModalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                activeOpacity={0.9}
                onPress={() => {
                  setCommentText('');
                  setIsCommentModalVisible(false);
                }}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.postBtn, !commentText.trim() && styles.postBtnDisabled]}
                activeOpacity={0.9}
                onPress={() => {
                  if (!commentText.trim()) return;
                  setCommentText('');
                  setIsCommentModalVisible(false);
                }}
              >
                <Text style={styles.postBtnText}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  heroWrap: { height: 360, marginBottom: 14 },
  heroImage: { width: '100%', height: '100%' },
  heroHeader: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 18, flexDirection: 'row', justifyContent: 'space-between' },
  heroHeaderRight: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroTextWrap: { position: 'absolute', left: 18, right: 18, bottom: 20 },
  categoryPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 12,
  },
  categoryPillText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#065F46', textTransform: 'uppercase' },
  heroTitle: { fontFamily: AppTypography.bold, fontSize: 28, lineHeight: 34, color: '#FFFFFF', marginBottom: 8 },
  heroSubtitle: { fontFamily: AppTypography.medium, fontSize: 13, lineHeight: 19, color: 'rgba(255,255,255,0.9)' },
  metaRow: { paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  metaText: { fontFamily: AppTypography.medium, fontSize: 12, color: '#6B7280' },
  metaDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#9CA3AF', marginHorizontal: 8 },
  engagementRow: { paddingHorizontal: 22, flexDirection: 'row', gap: 8, marginBottom: 14 },
  statPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#F0FDF4', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  statText: { fontFamily: AppTypography.bold, fontSize: 11, color: '#047857' },
  actionRow: { paddingHorizontal: 22, flexDirection: 'row', gap: 10, marginBottom: 14 },
  actionButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    backgroundColor: '#F0FDF4',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonActive: { backgroundColor: '#059669', borderColor: '#059669' },
  actionButtonText: { fontFamily: AppTypography.bold, fontSize: 13, color: '#059669' },
  actionButtonTextActive: { color: '#FFFFFF' },
  articleBodyWrap: { paddingHorizontal: 22, marginBottom: 18 },
  paragraph: { fontFamily: AppTypography.medium, fontSize: 14, lineHeight: 23, color: '#334155', marginBottom: 12 },
  sectionHeader: { paddingHorizontal: 22, marginBottom: 10, marginTop: 8 },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0A2218' },
  galleryScroll: { paddingHorizontal: 22, gap: 10, marginBottom: 18 },
  galleryImage: { width: 190, height: 130, borderRadius: 14, backgroundColor: '#E5E7EB' },
  sponsoredCard: {
    marginHorizontal: 22,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#D1FAE5',
    marginBottom: 16,
  },
  sponsoredLabel: { fontFamily: AppTypography.bold, fontSize: 10, color: '#059669', textTransform: 'uppercase', marginBottom: 6 },
  sponsoredTitle: { fontFamily: AppTypography.bold, fontSize: 16, color: '#14532D', marginBottom: 6 },
  sponsoredDesc: { fontFamily: AppTypography.medium, fontSize: 13, color: '#4B5563', lineHeight: 19 },
  sponsoredBtn: { alignSelf: 'flex-start', marginTop: 12, backgroundColor: '#059669', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  sponsoredBtnText: { fontFamily: AppTypography.bold, fontSize: 12, color: '#FFFFFF' },
  relatedScroll: { paddingHorizontal: 22, gap: 10, marginBottom: 16 },
  relatedCard: {
    width: 210,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ECFDF5',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  relatedImage: { width: '100%', height: 112, borderRadius: 10, marginBottom: 8, backgroundColor: '#E5E7EB' },
  relatedTitle: { fontFamily: AppTypography.bold, fontSize: 13, color: '#14532D', lineHeight: 18 },
  commentsWrap: { paddingHorizontal: 22, gap: 10 },
  commentCard: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#ECFDF5', padding: 12 },
  commentTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  commentUserRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  commentAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E5E7EB' },
  commentName: { fontFamily: AppTypography.bold, fontSize: 13, color: '#0A2218' },
  commentLikeRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  commentLikeText: { fontFamily: AppTypography.bold, fontSize: 11, color: '#059669' },
  commentText: { fontFamily: AppTypography.medium, fontSize: 13, color: '#4B5563', lineHeight: 19 },
  addCommentBtn: { marginTop: 2, backgroundColor: '#059669', borderRadius: 12, alignItems: 'center', justifyContent: 'center', height: 44 },
  addCommentText: { fontFamily: AppTypography.bold, fontSize: 14, color: '#FFFFFF' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.45)',
    justifyContent: 'flex-end',
  },
  commentModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    paddingBottom: 26,
  },
  commentModalTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0A2218', marginBottom: 4 },
  commentModalSub: { fontFamily: AppTypography.medium, fontSize: 13, color: '#6B7280', marginBottom: 12 },
  commentInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: '#D1FAE5',
    backgroundColor: '#F8FFFC',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    textAlignVertical: 'top',
    fontFamily: AppTypography.medium,
    fontSize: 14,
    color: '#0A2218',
  },
  commentModalActions: { flexDirection: 'row', gap: 10, marginTop: 12 },
  cancelBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelBtnText: { fontFamily: AppTypography.bold, fontSize: 13, color: '#4B5563' },
  postBtn: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669',
  },
  postBtnDisabled: { backgroundColor: '#A7F3D0' },
  postBtnText: { fontFamily: AppTypography.bold, fontSize: 13, color: '#FFFFFF' },
});
