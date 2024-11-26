const ALEXSANDER_CONFIG = {
	isProd: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
	isStaging: process.env.NEXT_PUBLIC_VERCEL_ENV === 'staging',
	isDev: process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_VERCEL_ENV,
	i18n: {
		domains: {
			norweigan: ['alexsander-w6k2.vercel.app'], //TODO: BYTT
		},
		languages: [
			{
				title: 'Norsk',
				default: true,
				value: 'nb',
				tld: 'no',
				origin: 'alexsander-w6k2.vercel.app',
				domain: 'alexsander-w6k2.vercel.app',
				htmlLocaleValue: 'nb-NO',
			},
		],
		fallbackLanguage: 'nb',
	},
	seo: {
		title: "Arnseth's Kaker",
		description: "Arnset's Kaker sin offisielle nettside",
		ignoredDomains: ['alexsander-w6k2.vercel.app'],
		defaultDomain: 'arnsethskaker.no',
	},
	fallbackHostName: 'arnsethskaker.no',
};

export default ALEXSANDER_CONFIG;