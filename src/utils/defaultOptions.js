
const opts = {}

opts.currencyFormat = {
  currency: {
    symbol: '$', // default currency symbol is '$'
    format: '%s%v', // controls output: %s = symbol, %v = value (can be object, see docs)
    decimal: '.', // decimal point separator
    thousand: ',', // thousands separator
    precision: 2, // decimal places
    grouping: 3 // digit grouping (not implemented yet)
  },
  number: {
    precision: 0, // default precision on numbers is 0
    grouping: 3, // digit grouping (not implemented yet)
    thousand: ',',
    decimal: '.'
  }
}
/**
 * these came from the body data- attributes populated in the gsp
 * <body data-context-path="${request.contextPath}"
    data-user-roles="${sec.loggedInUserInfo(field: 'authorities')}"
    data-user-contact-org="${orgInfo as JSON}"
    data-user-owner="${currentUser?.isOwner}"
    data-user-id="${currentUser?.id}"
    data-user-name="${currentUser?.name}"
    data-dispute-review-status-list="${AppParam.fetch('disputeReviewStatusList',)?.value}"
    data-quick-pick-state="${(pageProperty(name: 'body.data-quick-pick-state') ?: quickPickState) ?: AppParam.fetch("quickPickState")?.value}"
    data-ng-app="${pageProperty(name: 'body.data-ng-app')}"
    data-resource-name="${pageProperty(name: 'body.data-resource-name')}"
    data-resource-path="${pageProperty(name: 'body.data-resource-path')}"
    data-user-view="${secService.ifNotGranted(SecRole.BRANCH, SecRole.CUSTOMER) ? 'fullview' : 'pcview'}"
      data-read-only-config="${readOnlyConfig}"
    disable-read-only="${controllerName == 'admin' ? 'admin' :rdsv.isReadRole(controllerName)}">
 */
opts.currentUser = {
  id: 1,
  name: 'Bill',
  org: {
    id: 1,
    name: 'foo',
    orgType: {
      id: 1,
      name: 'company'
    }
  }
}

opts.context = {
  // data-context-path="${request.contextPath}"
  path: '/'

}

export default opts
