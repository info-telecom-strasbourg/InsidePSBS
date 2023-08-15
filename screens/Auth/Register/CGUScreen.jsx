import React, { useState } from "react";

import { ScrollView, Text, View } from "react-native";
import { PrimaryButton, ScreenContainer, Separator } from "../../../components";
import { text_styles } from "../../../styles";
import { useTheme } from "../../../contexts";
import { COLORS, ROUTES, TEXT } from "../../../constants";
import { useRouter, useLocalSearchParams } from "expo-router";
import CheckBox from "expo-checkbox";

const CguScreen = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const { step } = useLocalSearchParams();
  const [checked, setChecked] = useState(false);
  return (
    <ScreenContainer>
      <View
        style={{
          paddingHorizontal: 20,
          paddingVertical: 25,
          flex: 1,
        }}
      >
        <Text style={{ ...text_styles.title2(theme), fontSize: 23 }}>
          {TEXT.authentification.register.cgu}
        </Text>
        <Separator size={25} vertical />
        <ScrollView style={{ flex: 1 }}>
          <Text style={text_styles.body3(theme)}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            malesuada ligula odio, ut commodo sapien laoreet id. Vivamus vitae
            ultricies turpis. Etiam elit ex, ultricies a volutpat a, tincidunt
            id massa. Quisque tempor enim tellus, sed consectetur risus
            vulputate a. Donec nibh massa, convallis ac est feugiat, egestas
            vehicula magna. Aliquam sed porta nulla. Cras eu iaculis diam. Duis
            semper libero lectus, quis lobortis libero molestie eu. Nam rutrum
            neque sed nibh rutrum, id placerat sapien dictum. Phasellus
            pulvinar, lorem quis accumsan sodales, neque magna ultrices purus,
            vitae placerat nulla dolor vitae diam. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nunc lacus eros, pulvinar sit amet
            lacus eget, maximus iaculis velit. Integer efficitur accumsan neque
            pellentesque accumsan. Nulla purus risus, fringilla a ligula eget,
            convallis finibus diam. Curabitur commodo auctor pretium. Aliquam
            sed ante feugiat, volutpat enim eu, maximus odio. Maecenas porttitor
            condimentum quam, et faucibus risus. Praesent euismod, urna et
            ultricies congue, nisi massa condimentum nulla, a accumsan ex dui in
            odio. Nulla lacinia suscipit condimentum. Praesent pellentesque
            magna at nunc facilisis varius. Mauris sit amet varius est. Quisque
            in viverra augue. Nulla eu eros quis ipsum finibus pulvinar. Etiam
            vehicula, dolor ac facilisis dignissim, turpis est fermentum tortor,
            non fringilla elit lectus fringilla nulla. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Vivamus tempor sodales dui. Nullam ornare ex nec eros
            convallis, ac dictum mauris fringilla. Morbi sed metus vel felis
            faucibus vulputate eget eu nisl. Proin vitae leo vitae nisi
            convallis feugiat. Vivamus molestie dapibus est. Praesent ut mauris
            rhoncus, porttitor mauris sed, malesuada est. Nulla facilisi. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. In vulputate
            lacus tempus aliquam scelerisque. Donec sodales ligula tortor, ut
            aliquet velit semper sed. Nulla facilisi. Duis dui ligula, convallis
            id luctus at, feugiat a orci. Vestibulum efficitur, urna in molestie
            placerat, dolor est tincidunt neque, quis aliquet orci risus quis
            lacus. Proin molestie augue ac tortor ultrices, id laoreet diam
            tincidunt. Sed aliquet efficitur turpis, a dignissim magna efficitur
            et. Suspendisse ex turpis, iaculis vel pulvinar ac, auctor in dolor.
            Vestibulum consequat vulputate elit, ut tristique lacus feugiat sit
            amet. Vivamus lobortis, odio nec volutpat suscipit, nulla nulla
            lobortis est, et imperdiet arcu erat vel purus. Pellentesque id leo
            nec lorem viverra pretium. Cras at mi faucibus, aliquet est ut,
            pretium velit. Suspendisse potenti. Nam interdum ligula accumsan,
            tristique dolor sodales, maximus nisl. Sed porta vel ante ut
            aliquet. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Ut iaculis condimentum euismod.
            Mauris a metus et libero dapibus egestas ut nec odio. Nullam
            sagittis id sem nec condimentum. Curabitur a justo ex. Nullam
            lacinia malesuada vulputate. Praesent a euismod nibh. Praesent non
            scelerisque urna. Nullam a magna lorem. Duis ac est eget velit
            bibendum luctus. Sed laoreet quis nibh eget finibus. Mauris
            tincidunt ut metus a mollis. Sed vitae neque commodo, gravida justo
            vitae, rhoncus lorem. Sed condimentum sollicitudin quam in finibus.
            Fusce purus ipsum, faucibus nec tincidunt nec, sagittis et orci.
            Fusce maximus ac leo ut laoreet. Vivamus suscipit orci ac vulputate
            sodales. In sagittis hendrerit augue. Nullam aliquam sed elit
            rhoncus rutrum. Fusce vehicula ante neque, a dictum nibh mollis a.
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Integer tristique mi vitae felis
            consectetur, vitae vestibulum eros faucibus. Suspendisse nunc
            lectus, pretium et blandit non, malesuada vitae nibh. Sed accumsan
            nunc eget erat finibus, vitae finibus nisl tristique. Maecenas
            elementum magna non ligula volutpat efficitur. Etiam sodales
            scelerisque neque. Maecenas molestie ultrices lacus tempor
            scelerisque. Nunc sodales, tortor ut sollicitudin gravida, purus
            nulla convallis risus, ac consequat augue tortor at erat. Fusce sed
            gravida velit, ut fermentum augue. Pellentesque dapibus felis ac
            rhoncus imperdiet. Aliquam eu interdum tellus, vitae rhoncus ipsum.
            Morbi et eleifend sapien. Donec faucibus magna non turpis maximus
            finibus. Sed lectus turpis, molestie vitae arcu et, semper tempus
            sem. Fusce ultricies laoreet pharetra. In non velit sagittis, ornare
            nunc non, pellentesque urna. Quisque orci est, dapibus et nisi id,
            tincidunt tristique tortor. Etiam vitae iaculis libero, a aliquam
            massa. Cras auctor dolor felis, et consectetur massa sagittis
            dictum. Suspendisse faucibus massa vitae lectus bibendum, ut
            ullamcorper nibh fringilla. Vivamus porttitor aliquet est non
            blandit. Vestibulum quis sapien facilisis justo consequat laoreet.
            Praesent bibendum nec ex sed pretium. Mauris viverra erat sed arcu
            euismod, non molestie lorem lobortis. Praesent id est felis. Aliquam
            pulvinar arcu a nibh ultricies, tempus fringilla lorem condimentum.
            Nunc molestie mauris id massa cursus, ut pretium odio sollicitudin.
            Quisque erat erat, feugiat ac lobortis id, cursus nec leo. Etiam ut
            sodales purus. Duis ut mollis ex, quis facilisis dui. Nam lacus
            velit, fringilla ac ornare non, faucibus vel enim. Nulla sodales
            rutrum quam sit amet maximus. Curabitur id orci scelerisque, iaculis
            sem eget, placerat sapien. Maecenas lobortis lectus quis facilisis
            lacinia. Vivamus rhoncus imperdiet lacus, eget ultricies nunc
            finibus a. Cras vitae aliquet ante, eu faucibus orci. Praesent
            ultrices ipsum sem, in viverra nunc vehicula ac. Aenean vitae mauris
            eu ipsum vehicula sodales vel quis dui. Suspendisse fringilla
            suscipit arcu eu efficitur. Fusce dui enim, varius id ipsum quis,
            egestas fermentum nisi. Morbi aliquet in nisl ut aliquam. Vivamus mi
            urna, efficitur eget augue ac, semper fringilla ligula. Pellentesque
            molestie ultrices diam, non condimentum quam consectetur nec.
            Pellentesque eu mollis velit, ut ultrices dolor. Nulla facilisi.
            Fusce at turpis ac erat ornare tempor. Duis enim risus, viverra
            mollis erat sed, venenatis luctus dui. Nam sodales nisi sed odio
            rhoncus luctus. Aliquam ut purus nisl.
          </Text>
        </ScrollView>
        <Separator size={20} vertical />
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            color={checked ? COLORS.primary : theme.text}
            onValueChange={setChecked}
            value={checked}
          />
          <View style={{ width: 10 }} />
          <Text style={text_styles.body3(theme)}>
            {TEXT.authentification.register.accept_cgu}
          </Text>
        </View>
        <Separator size={35} vertical />
        <PrimaryButton
          text={TEXT.authentification.register.next}
          onPress={() => router.push(`${ROUTES.register}/${Number(step) + 1}`)}
        />
      </View>
    </ScreenContainer>
  );
};

export default CguScreen;
