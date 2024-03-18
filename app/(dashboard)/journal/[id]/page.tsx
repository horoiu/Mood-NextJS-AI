type EntryPageProps = {
  params: {
    id: string
  }
}

const EntryPage = ({ params }: EntryPageProps) => {
  return <div>{params.id}</div>
}

export default EntryPage
