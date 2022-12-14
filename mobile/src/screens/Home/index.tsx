import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import logo from "../../assets/logo-nlw-esports.png";
import { styles } from "./styles";

import { GameCard, GameCardProps } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { Background } from "../../components/Background";

function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);
  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameCardProps) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    fetch("http://192.168.100.7:3333/games")
      .then((response) => response.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que desejar jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}

export { Home };
