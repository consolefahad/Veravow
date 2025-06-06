import {
  heightPercentageToDP as hpBase,
  widthPercentageToDP as wpBase,
} from "react-native-responsive-screen";

const scaleWidth = (percent: number): number => wpBase(`${percent}%`);

const scaleHeight = (percent: number): number => hpBase(`${percent}%`);

const scaleFont = (size: number): number => wpBase(size);

export { scaleHeight as hp, scaleFont as Size, scaleWidth as wp };
