export default function Footer() {
  return (
    <footer className="borderFooter max-md:mx-6 max-md:my-4 max-md:rounded-3xl max-md:bg-blackFigma max-md:px-6 max-md:py-10">

        <div className="veryCenter gap-4">
            <div className="text-biruFigma bg-bgBiruFigma py-1 px-2 rounded-xl">
                Technology
            </div>

            <div className="text-biruFigma bg-bgBiruFigma py-1 px-2 rounded-xl">
                Ai
            </div>

            <div className="text-purpleFigma bg-bgPurpleFigma py-1 px-2 rounded-xl">
                Design
            </div>
        </div>

        <div className="font-bold text-4xl max-md:text-3xl max-md:text-center">
            Ready to find your community?
        </div>

        <div className="text-trFooter px-115 text-center max-md:px-0">
            Join thousands of developers, designers, and makers in Indonesia's most active tech communities.
        </div>

        <div className="veryCenter gap-6 max-md:flex-col max-md:gap-4">

            <div className="btnBordColor max-md:w-full max-md:max-w-xs text-center">
                Explore Events
            </div>

            <div className="btnTr max-md:w-full max-md:max-w-xs text-center">
                Browse Communities
            </div>

        </div>

    </footer>
  )
}