import React from "react";
import { View } from "react-native";

import fouailleStyles from "./fouaille.style";
import {
  BackButtonTopbar,
  Loader,
  ScrollScreenContainer,
} from "../../components";
import { TEXT } from "../../constants";
import { useFetch } from "../../hooks";
import Card from "./Card";
import TransactionSection from "./transactions/TransactionSection";

const FouailleScreen = () => {
  const { res, loading, error } = useFetch(
    "https://fouaille.bde-tps.fr/api/fouaille/show/3?page_size=20&page=1"
  );
  const styles = fouailleStyles();
  if (loading) return <Loader />;

  return (
    <ScrollScreenContainer>
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
      <View style={styles.wrapper}>
        <Card
          firstname={res?.data.first_name}
          lastname={res?.data.last_name}
          money={res?.data.balance}
        />
        <TransactionSection commands={res?.data.commands} />
      </View>
    </ScrollScreenContainer>
  );
};

export default FouailleScreen;
