export default function Post({data}){

    return (
        <article>
            <header>
                {data.title} <br />
                {data.created_at} : {data.updated_at}<br />
                {data.author.name}
            </header>
            <div>{data.body}</div>
        </article>
    );

}