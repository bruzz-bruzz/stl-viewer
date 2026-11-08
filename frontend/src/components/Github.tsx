import './App.css'
type Data = {
    profileURL:string,
    repoURL:string,
    mode: string
}
export default function Github({profileURL,repoURL, mode}:Data){
    return (
        <footer className={`p-6 text-center border-t mt-8 ${mode === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <p className={`text-sm ${mode === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Made by bruzz-bruzz</p>
            <div className='flex justify-center gap-4 mt-2'>
                <a className={`${mode === 'light' ? 'text-blue-600' : 'text-blue-400'} hover:underline`} href={profileURL}>GitHub Profile</a>
                <a className={`${mode === 'light' ? 'text-blue-600' : 'text-blue-400'} hover:underline`} target='_blank' rel='noopener noreferrer' href={repoURL}>GitHub Repository</a>
            </div>
        </footer>
    )
}