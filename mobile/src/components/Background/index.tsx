import { ImageBackground } from "react-native";
import { styles } from "./styles";
import backgroundImg from "../../assets/background-galaxy.png";

interface BackgroundProps {
  children: React.ReactNode;
}

function Background({ children }: BackgroundProps) {
  return (
    <ImageBackground
      source={backgroundImg}
      defaultSource={backgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}

export { Background };
