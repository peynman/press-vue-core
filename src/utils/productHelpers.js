export function getProductFixedPrice (product) {
  return product?.data?.fixedPrice
}

export function getProductCategories (product) {
  return product?.categories?.filter(c => c.data?.showOnProductCard)
    .sort((a, b) => parseInt(a.data?.order ?? a.id) - parseInt(b.data?.order ?? a.id)) ?? []
}

export function getProductCateogiesMaxOffPercent (product) {
  return getProductCategories(product)?.reduce((max, c) => {
    try {
      const percent = parseInt(c.data?.offPercent)
      if (percent > 0 && percent < 100 && percent > max) {
        return percent
      }
    } catch (e) {
      console.error(e)
    }
    return max
  }, 0) ?? 0
}

export function getProductPriceTag (product) {
  if (product?.pivot?.data?.amount) {
    return parseInt(product?.pivot?.data?.amount) / (product?.pivot?.data?.quantity > 0 ? product?.pivot?.data?.quantity : 1)
  }
  const m = getProductCateogiesMaxOffPercent(product)
  const a = getProductFixedPrice(product)

  if (m > 0) {
    return parseInt(a?.amount) * (1 - (m / 100))
  } else {
    return parseInt(a.amount)
  }
}
