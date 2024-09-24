export type TAnimation =
  | 'default'
  | 'fade'
  | 'fade_from_bottom'
  | 'slide_from_bottom'
  | 'slide_from_right'
  | 'slide_from_left'
  | 'flip' // flip the screen, requires presentation: "modal" (iOS only)
  | 'none';
