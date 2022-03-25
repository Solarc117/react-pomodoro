import { quotes } from '../../quotesGreetings.json'

export default function Quote() {
  const { quote, source } = quotes[Math.floor(Math.random() * quotes.length)]
  
  return (
    <div className='quote'>
      <blockquote className='quoteText'>
        <svg className='quoteSVG' focusable='false' viewBox='0 0 512 512'>
          <path
            fill='currentColor'
            d='M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z'
          ></path>
        </svg>
        {quote}
      </blockquote>
      <p className='quoteAuthor'>{source}</p>
    </div>
  )
}
