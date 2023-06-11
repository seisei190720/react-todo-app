import { useRecoilValue, useSetRecoilState } from 'recoil';
import { textState } from '../atoms/text';

export default function App() {
    const text = useRecoilValue(textState);         // 読み込み専用
    const setText = useSetRecoilState(textState);   // 書き込み専用
}
