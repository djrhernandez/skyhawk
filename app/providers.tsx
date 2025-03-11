'use client'

import { ThemeProvider } from 'next-themes'
import { PropsWithChildren } from 'react'
import { ApolloWrapper } from '../apollo-provider'

export function Providers({ children }: PropsWithChildren) {
	return (
	<ThemeProvider attribute="class">
		<ApolloWrapper>{children}</ApolloWrapper>
	</ThemeProvider>
	)
}