'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Step3Schema, Step3Data } from '@/schemas/user-steps';
import { useUserFormStore } from '@/store/userFormStore';
import { Plus, Trash2 } from 'lucide-react';

interface Step3Props {
  onNext: () => void;
  onPrev: () => void;
}

export const Step3 = ({ onNext, onPrev }: Step3Props) => {
  const { formData, updateFormData } = useUserFormStore();

  const form = useForm<Step3Data>({
    resolver: zodResolver(Step3Schema),
    defaultValues: {
      skills: formData.skills && formData.skills.length > 0 
        ? formData.skills 
        : [{ field: '', tags: [''] }],
    },
  });

  const skills = form.watch('skills');

  const onSubmit = (data: Step3Data) => {
    updateFormData(data);
    onNext();
  };

  const addSkill = () => {
    const currentSkills = form.getValues('skills');
    form.setValue('skills', [...currentSkills, { field: '', tags: [''] }]);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues('skills');
    // Prevent removing the last skill (at least one skill must remain)
    if (currentSkills.length > 1) {
      form.setValue('skills', currentSkills.filter((_, i) => i !== index));
    }
  };

  const addTag = (skillIndex: number) => {
    const currentSkills = form.getValues('skills');
    const updatedSkills = [...currentSkills];
    updatedSkills[skillIndex].tags.push('');
    form.setValue('skills', updatedSkills);
  };

  const removeTag = (skillIndex: number, tagIndex: number) => {
    const currentSkills = form.getValues('skills');
    const updatedSkills = [...currentSkills];
    // Prevent removing the last tag (at least one tag must remain per skill)
    if (updatedSkills[skillIndex].tags.length > 1) {
      updatedSkills[skillIndex].tags = updatedSkills[skillIndex].tags.filter((_, i) => i !== tagIndex);
      form.setValue('skills', updatedSkills);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Step 3: Skills</h2>
        <p className="text-gray-600">Add your skills and expertise</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Skills Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Skills</h3>
              <Button type="button" onClick={addSkill} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </div>

            {skills.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No skills added yet. Click &quot;Add Skill&quot; to get started.</p>
              </div>
            )}

            {skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Skill {skillIndex + 1}</h4>
                  {skills.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSkill(skillIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  {skills.length === 1 && (
                    <span className="text-sm text-gray-500 font-medium">
                      Required
                    </span>
                  )}
                </div>

                {/* Skill Field */}
                <FormField
                  control={form.control}
                  name={`skills.${skillIndex}.field`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skill Field*</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Programming, Design, Marketing" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Tags*</FormLabel>
                    <Button
                      type="button"
                      onClick={() => addTag(skillIndex)}
                      variant="outline"
                      size="sm"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Tag
                    </Button>
                  </div>

                  {skill.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`skills.${skillIndex}.tags.${tagIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="e.g., JavaScript, React, Node.js"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTag(skillIndex, tagIndex)}
                        disabled={skill.tags.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onPrev}>
              Previous Step
            </Button>
            <Button type="submit" className="bg-primary text-white">
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
