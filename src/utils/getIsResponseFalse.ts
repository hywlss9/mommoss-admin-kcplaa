function getIsResponseFalse(response: any) {
  return typeof response === 'boolean' && !response;
}

export default getIsResponseFalse;
