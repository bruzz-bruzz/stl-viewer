import './App.css'
type Data = {
    profileURL:string,
    repoURL:string
}
export default function Github({profileURL,repoURL}:Data){
    return (
        <footer className='p-6 text-center border-t border-gray-200 dark:border-gray-700 mt-8'>
            <p className='text-sm text-gray-600 dark:text-gray-400'>Made by bruzz-bruzz</p>
            <div className='flex justify-center gap-4 mt-2'>
                <a className='text-blue-600 dark:text-blue-400 hover:underline' href={profileURL}>GitHub Profile</a>
                <a className='text-blue-600 dark:text-blue-400 hover:underline' target='_blank' rel='noopener noreferrer' href={repoURL}>GitHub Repository</a>
            </div>
        </footer>
    )
}