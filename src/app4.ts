// 345. Reverse Vowels of a String
// Easy
// 4.2K
// 2.7K
// Companies
// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in
//  both lower and upper cases, more than once.

// Example 1:

// Input: s = "hello"
// Output: "holle"
// Example 2:

// Input: s = "leetcode"
// Output: "leotcede"

// Constraints:

// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

// sol 1, brute force O(nm)
function reverseVowels1(s: string): string {
  const array = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  const vowelsInArray = [];
  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < vowels.length; j++) {
      if (s[i] === vowels[j]) {
        vowelsInArray.push(s[i]);
        array[i] = '';
        break;
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (array[i] === '') {
      array[i] = vowelsInArray[vowelsInArray.length - 1];
      vowelsInArray.pop();
    }
  }
  return array.join('');
}

// sol 2, runtime O(n)

export function reverseVowels(s: string): string {
  const array = s.split('');
  const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let vowelObject: { [key: string]: string } = {};
  vowels.forEach((vowel) => {
    vowelObject[vowel] = vowel;
  });

  const vowelsInArray: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (vowelObject[s[i]]) {
      vowelsInArray.push(s[i]);
      array[i] = '';
    }
  }
  let count = vowelsInArray.length - 1;
  for (let i = 0; i < s.length; i++) {
    if (array[i] === '') {
      array[i] = vowelsInArray[count];
      count--;
    }
  }
  return array.join('');
}

console.log('reverseVowels', reverseVowels('hello'));
