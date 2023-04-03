function getIsResponseFalse(response: any): response is false {
  return typeof response === 'boolean' && !response;
}

export default getIsResponseFalse;
