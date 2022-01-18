export function stringify(value: Parameters<typeof JSON.stringify>['0']) {
	return JSON.stringify(value, null, 2)
}

export function matchFrame(arr: string[], matcher: RegExp): Record<any, any> {
	return JSON.parse(arr.find((element) => element.match(matcher)))
}
