export { }
declare namespace NodeJS {
  interface Process {
    env: ProcessEnv
  }
  interface ProcessEnv {
    NODE_ENV: string
    KAKAO_API_KEY: string
  }

}
declare global {
  interface Window {
    Kakao: any
  }
}