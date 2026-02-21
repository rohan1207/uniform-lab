import { LookTargetProvider } from './LookTargetContext';
import { TeacherCharacter } from './TeacherCharacter';
import { ParentWithStudentCharacter } from './ParentWithStudentCharacter';

function SceneContent({ character, mouse, bounds }) {
  return (
    <LookTargetProvider mouse={mouse} bounds={bounds}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-2, 3, 4]} intensity={0.4} />
      {character === 'teacher' && <TeacherCharacter />}
      {character === 'parentStudent' && <ParentWithStudentCharacter />}
    </LookTargetProvider>
  );
}

export function CharacterScene({ character, mouse, bounds }) {
  return (
    <>
      <SceneContent character={character} mouse={mouse} bounds={bounds} />
    </>
  );
}
