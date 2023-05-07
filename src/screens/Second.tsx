import { View, Text, Dimensions, FlatList, Image, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GetData } from '../Api';
import { Result } from '../types';
import BackDrop from '../components/BackDrop';
import Animated, { Extrapolation, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const SPACING = 10;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Second = (): JSX.Element => {
    const [movies, setMovies] = useState<Result[]>([]);
    const scrollX = useSharedValue(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            const movies = await GetData();
            setMovies([{ key: 'left-spacer' }, ...movies, { key: 'right-spacer' }]);
            setLoading(false);
        };

        if (movies.length === 0) {
            fetchMovies();
        }
    }, [movies]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollX.value = event.contentOffset.x;
        },
    });

    const renderItem = ({ item, index }: { item: Result; index: number }): JSX.Element => {
        if (!index) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
        }

        const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE];
        const animatedStyles = useAnimatedStyle(() => {
            const scale = interpolate(scrollX.value, inputRange, [0, -50, 0], { extrapolateRight: Extrapolation.CLAMP });

            return {
                transform: [{ scale }],
            };
        });

        return (
            <View style={{ width: ITEM_SIZE }}>
                <Animated.View
                    style={[
                        {
                            marginHorizontal: SPACING,
                            padding: SPACING * 2,
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: 34,
                        },
                        animatedStyles,
                    ]}
                >
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{ width: 250, height: 350, borderRadius: 35 }} />
                    <Text style={{ fontSize: 24 }} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={{ fontSize: 10 }}>ratings : ***</Text>
                    <Text style={{ fontSize: 10 }}>Genres: adventure</Text>
                    <Text style={{ fontSize: 12 }} numberOfLines={3}>
                        {item.overview}
                    </Text>
                </Animated.View>
            </View>
        );
    };

    if (loading || movies.length === 0) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <BackDrop movie={movies} scrollX={scrollX.value} />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 20 }}
                snapToInterval={ITEM_SIZE}
                decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
                renderItem={({ item, index }) => {
                    if (!item.poster_path) {
                        return <View style={{ width: SPACER_ITEM_SIZE }} />;
                    }

                    const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * ITEM_SIZE];

                    const animatedStyles = useAnimatedStyle(() => {
                        const scale = interpolate(scrollX.value, inputRange, [0, -50, 0], { extrapolateRight: Extrapolation.CLAMP });

                        return {
                            transform: [{ scale: scale }],
                        };
                    });
                    return (
                        <TouchableOpacity
                            onPress={() => console.log("oluyo")}
                        >
                            <View style={{ width: ITEM_SIZE }}>
                                <View style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
                                    <Animated.Image
                                        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                        style={[
                                            StyleSheet.absoluteFillObject,
                                            [{
                                                resizeMode: 'cover',
                                                borderRadius: 16,
                                                
                                            }],animatedStyles
                                        ]}
                                    />
                                </View>
                                <Text style={{ fontSize: 18, marginTop: 10 }} numberOfLines={1}>
                                    {item.title}
                                </Text>
                                <Text style={{ fontSize: 12, opacity: 0.7 }}>{item.release_date}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    )
}

export default Second