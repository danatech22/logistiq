// utils/scaling.js

import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Your base design is based on a screen width of 390
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844; // Standard height for a 390-width device like iPhone 12/13 Pro

/**
 * Scales a size based on the screen's width.
 * @param {number} size The original size from your design.
 * @returns {number} The scaled size for the current device.
 */
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * Scales a size based on the screen's height.
 * @param {number} size The original size from your design.
 * @returns {number} The scaled size for the current device.
 */
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

/**
 * Scales a size with a moderation factor. Good for fonts or icons.
 * @param {number} size The original size.
 * @param {number} [factor=0.5] The moderation factor.
 * @returns {number} The moderately scaled size.
 */
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
