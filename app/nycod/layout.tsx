import { Wrapper } from "../components/Wrapper"

export default function NycodLayout({
	children
}: { children: React.ReactNode }) {
	return (
		<Wrapper>{children}</Wrapper>
	)
}
