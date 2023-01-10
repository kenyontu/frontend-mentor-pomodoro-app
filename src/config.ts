export const appColors = ['orange', 'aqua', 'purple'] as const

export const appFontFamilies = ['kumbhSans', 'robotoSlab', 'spaceMono'] as const

export type AppColor = typeof appColors[number]
export type AppFontFamily = typeof appFontFamilies[number]
