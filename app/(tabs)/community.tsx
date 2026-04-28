import React from 'react';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, BookOpenText, ChevronRight, Flame, MessageCircle, Newspaper, Sparkles, TrendingUp, Users } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppTypography } from '@/constants/design';

const HIGHLIGHTS = [
  {
    id: 'h1',
    title: 'How to Layer Serums Correctly',
    subtitle: 'Simple order for better absorption and less irritation.',
    badge: 'Editor Pick',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    ],
  },
  {
    id: 'h2',
    title: 'SPF Myths You Should Stop Believing',
    subtitle: 'Daily sunscreen truths from dermatology guidance.',
    badge: 'Trending',
    images: [
      'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1200&q=80',
      'https://i.pinimg.com/1200x/fb/38/a7/fb38a7ce68e8db64387f56c9362c9cd1.jpg',
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80',
    ],
  },
];

const TOPICS = [
  { id: 't1', label: 'Acne Care', icon: Flame, color: '#F97316' },
  { id: 't2', label: 'Barrier Repair', icon: Sparkles, color: '#10B981' },
  { id: 't3', label: 'Ingredient Basics', icon: BookOpenText, color: '#06B6D4' },
  { id: 't4', label: 'Community Tips', icon: Users, color: '#8B5CF6' },
];

const FEED = [
  {
    id: 'n1',
    title: 'Morning vs Night Routine: What Changes?',
    excerpt: 'Understand when to use active ingredients and when to keep your routine calm.',
    readTime: '4 min read',
    tag: 'Routine',
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'n2',
    title: 'What to Do When Skin Suddenly Feels Dry',
    excerpt: 'A quick recovery plan to hydrate, protect, and avoid over-exfoliation.',
    readTime: '3 min read',
    tag: 'Hydration',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'n3',
    title: 'Skinova Community Roundup This Week',
    excerpt: 'Top member discussions, product wins, and practical routines worth trying.',
    readTime: '5 min read',
    tag: 'Community',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
  },
];

const MORE_STORIES = [
  { id: 'm1', title: 'Best Ingredients for Beginners', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80' },
  { id: 'm2', title: 'How Community Builds Better Skin Habits', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80' },
  { id: 'm3', title: '5-Minute Night Routine Guide', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=1200&q=80' },
];

export default function CommunityTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#F8FFFC', '#FCFFFE', '#FFFFFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
      <View style={styles.decorTop} />
      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <View>
          <Text style={styles.label}>Skinova Social</Text>
          <Text style={styles.title}>Community</Text>
        </View>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.8}>
          <Bell size={18} color="#065F46" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}>
        <View style={styles.heroCard}>
          <LinearGradient colors={['#10B981', '#059669']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFillObject} />
          <View style={styles.heroTop}>
            <View style={styles.heroPill}>
              <TrendingUp size={12} color="#065F46" />
              <Text style={styles.heroPillText}>Weekly Insights</Text>
            </View>
            <View style={styles.heroPill}>
              <MessageCircle size={12} color="#065F46" />
              <Text style={styles.heroPillText}>Live Talks</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>Latest skin-care news and trusted tips from Skinova</Text>
          <Text style={styles.heroSubtitle}>Stay updated with ingredient guides, routine ideas, and community stories in one place.</Text>
        </View>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Top Highlights</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.moreText}>See more</Text>
          </TouchableOpacity>
        </View>
        {HIGHLIGHTS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.highlightCard}
            activeOpacity={0.9}
            onPress={() => router.push({ pathname: '/community/[id]', params: { id: item.id } })}
          >
            <View style={styles.highlightImageRow}>
              <Image source={{ uri: item.images[0] }} style={styles.highlightMainImage} contentFit="cover" />
              <View style={styles.highlightSideColumn}>
                <Image source={{ uri: item.images[1] }} style={styles.highlightSideImage} contentFit="cover" />
                <Image source={{ uri: item.images[2] }} style={styles.highlightSideImage} contentFit="cover" />
              </View>
            </View>
            <View style={styles.highlightBadge}>
              <Text style={styles.highlightBadgeText}>{item.badge}</Text>
            </View>
            <Text style={styles.highlightTitle}>{item.title}</Text>
            <Text style={styles.highlightSubtitle}>{item.subtitle}</Text>
            <View style={styles.rowEnd}>
              <Text style={styles.readNow}>Read now</Text>
              <ChevronRight size={16} color="#059669" />
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Topics</Text>
        </View>
        <View style={styles.topicGrid}>
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            return (
              <TouchableOpacity key={topic.id} style={styles.topicCard} activeOpacity={0.8}>
                <View style={[styles.topicIconWrap, { backgroundColor: `${topic.color}20` }]}>
                  <Icon size={16} color={topic.color} />
                </View>
                <Text style={styles.topicLabel}>{topic.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>News Feed</Text>
        </View>
        {FEED.map((news) => (
          <TouchableOpacity
            key={news.id}
            style={styles.feedCard}
            activeOpacity={0.9}
            onPress={() => router.push({ pathname: '/community/[id]', params: { id: news.id } })}
          >
            <Image source={{ uri: news.image }} style={styles.feedImage} contentFit="cover" />
            <View style={styles.feedTagRow}>
              <View style={styles.feedTag}>
                <Newspaper size={12} color="#047857" />
                <Text style={styles.feedTagText}>{news.tag}</Text>
              </View>
              <Text style={styles.feedTime}>{news.readTime}</Text>
            </View>
            <Text style={styles.feedTitle}>{news.title}</Text>
            <Text style={styles.feedExcerpt}>{news.excerpt}</Text>
          </TouchableOpacity>
        ))}

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>More For You</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Text style={styles.moreText}>Explore all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.moreStoriesScroll}>
          {MORE_STORIES.map((story) => (
            <TouchableOpacity
              key={story.id}
              style={styles.moreCard}
              activeOpacity={0.85}
              onPress={() => router.push({ pathname: '/community/[id]', params: { id: story.id } })}
            >
              <Image source={{ uri: story.image }} style={styles.moreCardImage} contentFit="cover" />
              <Text style={styles.moreCardTitle} numberOfLines={2}>
                {story.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  decorTop: { position: 'absolute', width: 320, height: 320, borderRadius: 160, backgroundColor: '#10B981', opacity: 0.025, top: -130, right: -90 },
  header: { paddingHorizontal: 22, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontFamily: AppTypography.semibold, fontSize: 11, color: '#059669', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 },
  title: { fontFamily: AppTypography.bold, fontSize: 30, color: '#0A2218', letterSpacing: -0.6 },
  iconButton: { width: 42, height: 42, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  heroCard: { marginHorizontal: 22, borderRadius: 24, padding: 18, marginBottom: 20, overflow: 'hidden' },
  heroTop: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  heroPill: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#D1FAE5', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
  heroPillText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#065F46' },
  heroTitle: { fontFamily: AppTypography.bold, fontSize: 20, color: '#FFFFFF', marginBottom: 8, lineHeight: 27 },
  heroSubtitle: { fontFamily: AppTypography.medium, fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 20 },
  sectionHeader: { paddingHorizontal: 22, marginBottom: 10, marginTop: 6 },
  sectionHeaderRow: {
    paddingHorizontal: 22,
    marginBottom: 10,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontFamily: AppTypography.bold, fontSize: 18, color: '#0A2218', letterSpacing: -0.2 },
  moreText: { fontFamily: AppTypography.bold, fontSize: 12, color: '#059669' },
  highlightCard: { marginHorizontal: 22, padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 12, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.07, shadowRadius: 14, elevation: 3 },
  highlightImageRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  highlightMainImage: { flex: 1, height: 138, borderRadius: 12, backgroundColor: '#E5E7EB' },
  highlightSideColumn: { width: 92, justifyContent: 'space-between' },
  highlightSideImage: { width: '100%', height: 65, borderRadius: 10, backgroundColor: '#E5E7EB' },
  highlightBadge: { alignSelf: 'flex-start', backgroundColor: '#DCFCE7', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4, marginBottom: 10 },
  highlightBadgeText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#047857', textTransform: 'uppercase' },
  highlightTitle: { fontFamily: AppTypography.bold, fontSize: 16, color: '#0A2218', marginBottom: 6 },
  highlightSubtitle: { fontFamily: AppTypography.medium, fontSize: 13, color: '#6B7280', lineHeight: 19 },
  rowEnd: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 10 },
  readNow: { fontFamily: AppTypography.bold, fontSize: 12, color: '#059669', marginRight: 2 },
  topicGrid: { marginHorizontal: 22, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10, marginBottom: 12 },
  topicCard: { width: '48.5%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', flexDirection: 'row', alignItems: 'center' },
  topicIconWrap: { width: 34, height: 34, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  topicLabel: { fontFamily: AppTypography.semibold, fontSize: 13, color: '#14532D', flex: 1 },
  feedCard: { marginHorizontal: 22, backgroundColor: '#FFFFFF', borderRadius: 18, borderWidth: 1, borderColor: '#E2E8F0', padding: 16, marginBottom: 10, shadowColor: '#0F172A', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
  feedImage: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#E5E7EB',
  },
  feedTagRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  feedTag: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F0FDF4', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  feedTagText: { fontFamily: AppTypography.bold, fontSize: 10, color: '#047857', textTransform: 'uppercase', letterSpacing: 0.5 },
  feedTime: { fontFamily: AppTypography.medium, fontSize: 11, color: '#9CA3AF' },
  feedTitle: { fontFamily: AppTypography.bold, fontSize: 15, color: '#0A2218', marginBottom: 6 },
  feedExcerpt: { fontFamily: AppTypography.medium, fontSize: 13, color: '#6B7280', lineHeight: 19 },
  moreStoriesScroll: { paddingHorizontal: 22, paddingBottom: 4, gap: 10 },
  moreCard: {
    width: 210,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  moreCardImage: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#E5E7EB',
  },
  moreCardTitle: { fontFamily: AppTypography.bold, fontSize: 13, color: '#14532D', lineHeight: 18 },
});
