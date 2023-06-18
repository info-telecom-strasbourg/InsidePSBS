import React from "react";
import { View } from "react-native";
import BackButtonTopbar from "../../components/topbar/BackButtonTopbar";
import { TEXT } from "../../constants";
import fouailleStyles from "./fouaille.style";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/loader/Loader";
import Card from "./Card";
import TransactionSection from "./transactions/TransactionSection";

const FouailleScreen = () => {
  const { res, loading, error } = useFetch(
    "https://fouaille.bde-tps.fr/api/fouaille/show/3?page_size=20&page=1"
  );
  const styles = fouailleStyles();
  if (loading) return <Loader />;

  return (
    <View style={styles.container}>
      <BackButtonTopbar>{TEXT.fouaille.title}</BackButtonTopbar>
      <View style={styles.wrapper}>
        <Card
          firstname={res?.data.first_name}
          lastname={res?.data.last_name}
          money={res?.data.balance}
        />
        <TransactionSection commands={res?.data.commands} />
      </View>
    </View>
  );
};

export default FouailleScreen;
