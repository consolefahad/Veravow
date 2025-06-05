import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from "react-native-size-matters";

const scaleWidth = (size: number): number => scale(size);

const scaleHeight = (size: number): number => verticalScale(size);

const scaleFont = (size: number, factor?: number): number =>
  moderateScale(size, factor || 0.2);

const scaleHeightModerate = (size: number, factor?: number): number =>
  moderateVerticalScale(size, factor || 0.2);

export {
  scaleHeight as hp,
  scaleHeightModerate as hpModerate,
  moderateScale,
  moderateVerticalScale,
  scale,
  scaleFont as Size,
  verticalScale,
  scaleWidth as wp,
};
