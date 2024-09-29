const PSpanMexico = ({ line }: { line: string }) => {
  function highlightGamifyMexico(text: string): string {
    const highlightedText = text.replace(
      /(GamifyMéxico)/g,
      `<span class="text-gradient">$1</span>`
    )
    return highlightedText
  }

  return (
    <p
      className='leading-relaxed text-justify font-black'
      dangerouslySetInnerHTML={{ __html: highlightGamifyMexico(line) }}
    />
  )
}
export default PSpanMexico
