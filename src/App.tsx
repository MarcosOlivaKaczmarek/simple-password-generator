import { useState, useCallback, useEffect } from 'react';

function App() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charSet = '';
    if (useUpper) charSet += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) charSet += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charSet += '0123456789';
    if (useSymbols) charSet += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    if (charSet.length === 0) {
      setPassword('');
      return;
    }
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      newPassword += charSet[randomIndex];
    }
    setPassword(newPassword);
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  const strength = () => {
    let score = 0;
    if (length >= 8) score++;
    if (useUpper) score++;
    if (useLower) score++;
    if (useNumbers) score++;
    if (useSymbols) score++;
    return score;
  };

  const strengthScore = strength();

  const strengthLabel = () => {
    if (strengthScore === 0) return 'Weak';
    if (strengthScore === 1) return 'Weak';
    if (strengthScore === 2) return 'Fair';
    if (strengthScore === 3) return 'Strong';
    return 'Very Strong';
  };

  const strengthColor = () => {
    if (strengthScore <= 1) return 'red';
    if (strengthScore === 2) return 'orange';
    if (strengthScore === 3) return 'yellow';
    return 'green';
  };

  const handleCopyClick = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  return (
    <div className="bg-gray-950 h-screen flex items-center justify-center">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-white bg-gray-800 rounded px-2 py-1 w-full mr-2 overflow-hidden overflow-x-auto">
            {password || 'P4$$wOrd'}
          </div>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white rounded px-2 py-1 text-sm"
            onClick={handleCopyClick}
            disabled={!password}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="length" className="block text-white text-sm font-bold mb-2">
            Length: {length}
          </label>
          <input
            type="range"
            id="length"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={useUpper}
              onChange={() => setUseUpper(!useUpper)}
              className="mr-2 leading-tight"
            />
            Uppercase A-Z
          </label>

          <label className="block text-white text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={useLower}
              onChange={() => setUseLower(!useLower)}
              className="mr-2 leading-tight"
            />
            Lowercase a-z
          </label>

          <label className="block text-white text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={() => setUseNumbers(!useNumbers)}
              className="mr-2 leading-tight"
            />
            Numbers 0-9
          </label>

          <label className="block text-white text-sm font-bold mb-2">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={() => setUseSymbols(!useSymbols)}
              className="mr-2 leading-tight"
            />
            Symbols
          </label>
        </div>

        <div className="mb-4">
          <div className="text-white text-sm font-bold mb-2">Strength:</div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-800">
              <div
                style={{ width: `${strengthScore * 20}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-${strengthColor()}-500`}
              ></div>
            </div>
            <div className="text-white text-center text-sm">{strengthLabel()}</div>
          </div>
        </div>

        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          onClick={generatePassword}
        >
          Regenerate
        </button>
      </div>
    </div>
  );
}

export default App;
