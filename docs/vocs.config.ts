import { defineConfig } from 'vocs'

export default defineConfig({
  title: 'Spacedeck: Autonomous Settlement Protocol',
  description: 'DeFi rails for A2A and Machine-to-Machine settlement [Intent → Capital → Transaction]',
  sidebar: [
    {
      text: 'The Manifest',
      items: [
        { text: 'Unleash Your AI', link: '/index' },
        { text: 'Target Vectors', link: '/concepts/use-cases' },
        { text: 'The Prism Effect', link: '/concepts/prism' },
        { text: 'The Siphon Engine', link: '/concepts/siphon' },
      ],
    },
    {
      text: 'The Science of Execution',
      items: [
        { text: 'The Science of Capital', link: '/reference/the-science-of-autonomous-capital' },
        { text: 'The Execution Pipeline', link: '/reference/technical-overview' },
        { text: 'API Specification', link: '/reference/api' },
        { text: 'Shadow vs Physical', link: '/reference/shadow-manifold' },
      ],
    },
    {
      text: 'Security & Integrity',
      items: [
        { text: 'Dual-EIP Security Model', link: '/security/eip2612' },
        { text: 'ZK-Compliance Gate', link: '/security/zk-gate' },
        { text: 'Keyless MPC Matrix', link: '/security/mpc' },
      ],
    },
    {
      text: 'Integrations',
      items: [
        { text: 'Eliza Framework', link: '/developers/eliza' },
        { text: 'Zerebro Harness', link: '/developers/zerebro' },
        { text: 'Custom REST SDK', link: '/developers/rest' },
      ],
    },
    {
      text: 'Agent Interface',
      items: [
        { text: '🤖 LLMs.txt', link: '/llms' },
      ],
    },
  ],
})
