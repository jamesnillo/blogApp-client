import Banner from '../components/Banner';

export default function Home(){
	const data = {
		title: "Zuitt Blogs",
		content: "Freedom of speech for everyone, everywhere",
		destination: "/blogs",
		buttonLabel: "View Blogs"
	}

	return (

		<>
			<Banner data = {data} />
		</>

		)
}