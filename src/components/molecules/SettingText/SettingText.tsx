import { Button } from '@/components/atoms/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

type Props = {
  inputName: string;
  placeholder: string;
}

export default function SettingText({inputName, placeholder}: Props) {
    return (
      <div>
        <div className='h-[80px] bg-gray-100 p-3'>
          <h1 className='font-bold'>{inputName}</h1>
          <label className="flex items-center border-black border-b py-1">
            <input type="text" className="w-full appearance-none border-none bg-transparent text-gray-700 focus:outline-none" placeholder={placeholder} />
            <FontAwesomeIcon icon={faPen} />
          </label>         
        </div>
        <div className="flex justify-between bg-gray-200 p-2">
          <small  className='flex items-center text-gray-500'>32文字まで入力可能です。</small>
          <Button type='button' size='sm'>
             保存する
          </Button>
        </div>
      </div>
    );
}
