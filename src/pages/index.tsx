import { useRouter } from "next/router";
import React, { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import Image from 'next/image';

type Result = {
  "title": string,
  "htmlTitle": string,
  "link": string,
  "displayLink": string,
  "snippet": string,
  "htmlSnippet": string,
  "formattedUrl": string,
  "htmlFormattedUrl": string,

}

function Home() {

  const [search, setSearch] = React.useState('');
  const [results, setResults] = React.useState<Array<Result>>([]);

  const searchQuery = useRouter().query.search as string;
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_KEY
  const CX = process.env.NEXT_PUBLIC_CX

  // get search query from url
  useEffect(() => {
    if (searchQuery) {

      setSearch(searchQuery);
      fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&q=${searchQuery}`)
        .then(res => res.json())
        .then(data => {
          if (data.items) {
            setResults(data.items)
          }
        })

    }
  }, [searchQuery, setSearch]);

  return (
    <div className="flex flex-col justify-center gap-8 m-8 w-screen">
      <div className="container h-fit flex gap-4 w-screen  items-center">

        {/* logo */}
        <div className="">
          <Image className="w-64" width={64} height={32} src="https://c.neevacdn.net/image/fetch/s--0MWwRheq--/https%3A//tse3.mm.bing.net/th%3Fid%3DOIP.qIgHt9nwJTD985Ze62KpGwHaC3%26pid%3DApi?savepath=th" alt="logo" />
        </div>
        <div className='flex h-fit w-full align-middle '>
          <form className=''>
            <div className='flex gap-4 '>
              <div className='w-96 lg:w-[500px]'>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <GoSearch color='gray' />
                  </span>
                  <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300
                rounded-full py-4 pl-9 pr-3  hover:shadow-md focus:shadow-md focus:outline-none 
                sm:text-sm"  type="text" name="search" autoFocus
                    required
                    value={search} onChange={(e) => setSearch(e.target.value)} />

                </label>
              </div>
              <div>
                <button className='w-32 py-3 bg-gray-200 rounded-md text-lg text-gray-600 '
                >Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {results && <hr className='border-slate-100' />}

      <div className="container flex flex-col gap-4">
        {
          results?.map(result => (
            <p key={result.title}>{result.title}</p>
          ))
        }
      </div>
    </div >
  );
}

export default Home;
